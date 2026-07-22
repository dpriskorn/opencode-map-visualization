import { EventEmitter } from 'events';
export interface SSEClient {
    id: number;
    queue: Map<string, (data: unknown) => void>;
}
export declare class SSEManager extends EventEmitter {
    private clients;
    private clientCounter;
    addClient(): SSEClient;
    removeClient(clientId: number): void;
    sendCommand(clientId: number, commandType: string, data: unknown): void;
    broadcast(commandType: string, data: unknown): void;
    getClientCount(): number;
}
//# sourceMappingURL=sse.d.ts.map