// OpenClaw Agent Connector
// Replaces Claude Code JSONL watching with OpenClaw Gateway API

import type { AgentState, PersistedAgent } from './types.js';

const OPENCLAW_API_BASE = process.env.OPENCLAW_API_BASE || 'http://localhost:8080';
const POLL_INTERVAL_MS = 2000;

export interface OpenClawSession {
  sessionKey: string;
  model?: string;
  channel?: string;
  activeMinutes?: number;
  createdAt: string;
  lastMessageAt?: string;
  status?: 'active' | 'waiting' | 'idle';
  currentTask?: string;
}

export interface OpenClawStatus {
  sessions: OpenClawSession[];
}

export class OpenClawConnector {
  private agents: Map<number, AgentState> = new Map();
  private nextAgentId = 1;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private webview: any = null;

  constructor(webview: any) {
    this.webview = webview;
  }

  async start(): Promise<void> {
    console.log('[Pixel Agents] OpenClaw connector starting...');
    await this.pollSessions();
    this.pollTimer = setInterval(() => this.pollSessions(), POLL_INTERVAL_MS);
  }

  stop(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private async pollSessions(): Promise<void> {
    try {
      const response = await fetch(`${OPENCLAW_API_BASE}/api/sessions`);
      if (!response.ok) {
        console.log('[Pixel Agents] Failed to fetch sessions:', response.status);
        return;
      }
      
      const data: OpenClawStatus = await response.json();
      this.updateAgents(data.sessions);
    } catch (error) {
      console.log('[Pixel Agents] OpenClaw API error:', error);
    }
  }

  private updateAgents(sessions: OpenClawSession[]): void {
    const existingKeys = new Set(this.agents.keys());
    const sessionKeys = new Set(sessions.map(s => s.sessionKey));

    // Remove agents for closed sessions
    for (const id of existingKeys) {
      const agent = this.agents.get(id)!;
      if (!sessionKeys.has(agent.sessionKey)) {
        this.removeAgent(id);
      }
    }

    // Update or create agents
    for (const session of sessions) {
      let agent = Array.from(this.agents.values()).find(a => a.sessionKey === session.sessionKey);
      
      if (!agent) {
        // New agent
        agent = this.createAgent(session);
      } else {
        // Update existing agent
        this.updateAgent(agent, session);
      }
    }

    // Send full state to webview
    this.sendStateToWebview();
  }

  private createAgent(session: OpenClawSession): AgentState {
    const id = this.nextAgentId++;
    const agent: AgentState = {
      id,
      sessionKey: session.sessionKey,
      model: session.model || 'unknown',
      status: this.mapStatus(session.status),
      currentTask: session.currentTask || 'Idle',
      isWaiting: session.status === 'waiting',
      activeToolIds: new Set(),
      activeToolStatuses: new Map(),
    };
    
    this.agents.set(id, agent);
    this.webview?.postMessage({ type: 'agentCreated', id, sessionKey: session.sessionKey });
    
    console.log(`[Pixel Agents] Agent ${id}: created for session ${session.sessionKey}`);
    return agent;
  }

  private updateAgent(agent: AgentState, session: OpenClawSession): void {
    const newStatus = this.mapStatus(session.status);
    
    if (agent.status !== newStatus) {
      agent.status = newStatus;
      this.webview?.postMessage({ 
        type: 'agentStatus', 
        id: agent.id, 
        status: newStatus 
      });
    }

    if (agent.currentTask !== (session.currentTask || 'Idle')) {
      agent.currentTask = session.currentTask || 'Idle';
      this.webview?.postMessage({ 
        type: 'agentToolDone', 
        id: agent.id,
        toolName: session.currentTask || 'Idle'
      });
    }

    if (agent.isWaiting !== (session.status === 'waiting')) {
      agent.isWaiting = session.status === 'waiting';
      if (agent.isWaiting) {
        this.webview?.postMessage({ 
          type: 'agentStatus', 
          id: agent.id, 
          status: 'waiting' 
        });
      }
    }
  }

  private removeAgent(id: number): void {
    const agent = this.agents.get(id);
    if (agent) {
      this.webview?.postMessage({ type: 'agentClosed', id });
      this.agents.delete(id);
      console.log(`[Pixel Agents] Agent ${id}: removed`);
    }
  }

  private mapStatus(sessionStatus?: string): 'active' | 'waiting' | 'idle' {
    switch (sessionStatus) {
      case 'active': return 'active';
      case 'waiting': return 'waiting';
      default: return 'idle';
    }
  }

  private sendStateToWebview(): void {
    const agents = Array.from(this.agents.values()).map(a => ({
      id: a.id,
      sessionKey: a.sessionKey,
      model: a.model,
      status: a.status,
      currentTask: a.currentTask,
    }));
    
    this.webview?.postMessage({ type: 'existingAgents', agents });
  }

  getAgents(): AgentState[] {
    return Array.from(this.agents.values());
  }
}
