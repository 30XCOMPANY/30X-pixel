// Browser-compatible API for Pixel Agents OpenClaw
// Replaces VS Code API with browser native APIs and SSE

type MessageHandler = (msg: any) => void;

class BrowserApi {
  private handlers: MessageHandler[] = [];
  private eventSource: EventSource | null = null;

  constructor() {
    this.connect();
  }

  private connect(): void {
    // Connect to SSE for real-time updates
    this.eventSource = new EventSource('/events');
    
    this.eventSource.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        this.handlers.forEach(handler => handler(msg));
      } catch (e) {
        console.error('[Pixel Agents] Failed to parse message:', e);
      }
    };

    this.eventSource.onerror = () => {
      console.log('[Pixel Agents] SSE connection lost, reconnecting...');
      setTimeout(() => this.connect(), 3000);
    };
  }

  postMessage(msg: unknown): void {
    // For now, we don't need to send messages back to server
    // But keeping the API for compatibility
    console.log('[Pixel Agents] postMessage:', msg);
  }

  addMessageHandler(handler: MessageHandler): void {
    this.handlers.push(handler);
  }

  removeMessageHandler(handler: MessageHandler): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }
}

export const vscode = new BrowserApi();
