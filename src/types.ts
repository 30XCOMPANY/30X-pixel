// OpenClaw Agent Types
// Simplified for OpenClaw Gateway API integration

export interface AgentState {
  id: number;
  sessionKey: string;
  model: string;
  status: 'active' | 'waiting' | 'idle';
  currentTask: string;
  isWaiting: boolean;
  activeToolIds: Set<string>;
  activeToolStatuses: Map<string, string>;
  // OpenClaw-specific
  channel?: string;
  createdAt?: string;
  activeMinutes?: number;
}

export interface PersistedAgent {
  id: number;
  sessionKey: string;
  model: string;
  channel?: string;
}
