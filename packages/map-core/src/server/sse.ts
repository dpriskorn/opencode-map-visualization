import { EventEmitter } from 'events';

export interface SSEClient {
  id: number;
  queue: Map<string, (data: unknown) => void>;
}

export class SSEManager extends EventEmitter {
  private clients: Map<number, SSEClient> = new Map();
  private clientCounter = 0;

  addClient(): SSEClient {
    const client: SSEClient = {
      id: this.clientCounter++,
      queue: new Map(),
    };
    this.clients.set(client.id, client);
    return client;
  }

  removeClient(clientId: number): void {
    this.clients.delete(clientId);
  }

  sendCommand(clientId: number, commandType: string, data: unknown): void {
    const client = this.clients.get(clientId);
    if (!client) return;

    const message = JSON.stringify({ type: commandType, data });
    this.emit('message', clientId, message);
  }

  broadcast(commandType: string, data: unknown): void {
    const message = JSON.stringify({ type: commandType, data });
    for (const clientId of this.clients.keys()) {
      this.emit('message', clientId, message);
    }
  }

  getClientCount(): number {
    return this.clients.size;
  }
}
