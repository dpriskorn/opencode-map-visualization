import { EventEmitter } from 'events';
export class SSEManager extends EventEmitter {
    clients = new Map();
    clientCounter = 0;
    addClient() {
        const client = {
            id: this.clientCounter++,
            queue: new Map(),
        };
        this.clients.set(client.id, client);
        return client;
    }
    removeClient(clientId) {
        this.clients.delete(clientId);
    }
    sendCommand(clientId, commandType, data) {
        const client = this.clients.get(clientId);
        if (!client)
            return;
        const message = JSON.stringify({ type: commandType, data });
        this.emit('message', clientId, message);
    }
    broadcast(commandType, data) {
        const message = JSON.stringify({ type: commandType, data });
        for (const clientId of this.clients.keys()) {
            this.emit('message', clientId, message);
        }
    }
    getClientCount() {
        return this.clients.size;
    }
}
//# sourceMappingURL=sse.js.map