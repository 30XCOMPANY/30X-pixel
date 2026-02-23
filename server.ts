// Simple HTTP Server with SSE for Pixel Agents OpenClaw
// Reads sessions from OpenClaw sessions.json file

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3456;
const SESSIONS_FILE = process.env.SESSIONS_FILE || 
  '/Users/oogie/.openclaw/agents/main/sessions/sessions.json';

interface SessionData {
  sessionId: string;
  updatedAt: number;
  chatType: string;
  deliveryContext?: {
    channel?: string;
  };
  origin?: {
    provider?: string;
    from?: string;
  };
}

interface AgentInfo {
  id: number;
  sessionKey: string;
  sessionId: string;
  model: string;
  status: string;
  currentTask: string;
  channel?: string;
}

const app = express();
let clients: Set<express.Response> = new Set();
let agents: Map<string, AgentInfo> = new Map();
let nextAgentId = 1;

// Serve static files from webview build output
app.use(express.static(join(__dirname, 'dist', 'webview')));

// Fallback to index.html for SPA routing
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'webview', 'index.html'));
});

// SSE endpoint for real-time agent updates
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.add(res);
  console.log(`[Pixel Agents] Client connected. Total: ${clients.size}`);

  // Send initial state
  res.write(`data: ${JSON.stringify({ type: 'existingAgents', agents: Array.from(agents.values()) })}\n\n`);

  req.on('close', () => {
    clients.delete(res);
    console.log(`[Pixel Agents] Client disconnected. Total: ${clients.size}`);
  });
});

// API to get current agents
app.get('/api/agents', (req, res) => {
  res.json(Array.from(agents.values()));
});

// Broadcast to all connected clients
function broadcast(message: any): void {
  const data = `data: ${JSON.stringify(message)}\n\n`;
  for (const client of clients) {
    client.write(data);
  }
}

// Poll sessions from file
function pollSessions(): void {
  try {
    if (!existsSync(SESSIONS_FILE)) {
      console.log(`[Pixel Agents] Sessions file not found: ${SESSIONS_FILE}`);
      return;
    }

    const content = readFileSync(SESSIONS_FILE, 'utf-8');
    const sessionsData = JSON.parse(content);
    
    const sessions: SessionData[] = Object.values(sessionsData);
    const currentKeys = new Set(sessions.map(s => s.sessionId));

    // Remove agents for closed sessions
    for (const [key, agent] of agents) {
      if (!currentKeys.has(agent.sessionId)) {
        agents.delete(key);
        broadcast({ type: 'agentClosed', id: agent.id });
      }
    }

    // Update or create agents
    for (const session of sessions) {
      const key = session.sessionId;
      let agent = agents.get(key);
      
      // Determine status based on chatType and recency
      const now = Date.now();
      const lastActive = session.updatedAt;
      const isRecent = (now - lastActive) < 5 * 60 * 1000; // 5 minutes
      const status = session.chatType === 'system' || !isRecent ? 'idle' : 'active';
      
      const currentTask = `Session ${session.chatType}`;

      if (!agent) {
        agent = {
          id: nextAgentId++,
          sessionKey: key,
          sessionId: key,
          model: 'MiniMax-M2.5',
          status,
          currentTask,
          channel: session.deliveryContext?.channel || session.origin?.provider || 'unknown',
        };
        agents.set(key, agent);
        broadcast({ type: 'agentCreated', id: agent.id, sessionKey: key });
      } else {
        // Update existing
        if (agent.status !== status) {
          agent.status = status;
          broadcast({ type: 'agentStatus', id: agent.id, status });
        }
        if (agent.currentTask !== currentTask) {
          agent.currentTask = currentTask;
          broadcast({ type: 'agentToolDone', id: agent.id, toolName: currentTask });
        }
      }
    }

    // Broadcast full state periodically
    broadcast({ type: 'existingAgents', agents: Array.from(agents.values()) });

  } catch (error) {
    console.log(`[Pixel Agents] Polling error:`, error);
  }
}

// Start polling every 2 seconds
setInterval(pollSessions, 2000);
pollSessions(); // Initial poll

// Start server
const server = app.listen(PORT, () => {
  console.log(`[Pixel Agents] Server running at http://localhost:${PORT}`);
  console.log(`[Pixel Agents] Reading sessions from: ${SESSIONS_FILE}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[Pixel Agents] Shutting down...');
  server.close(() => process.exit(0));
});
