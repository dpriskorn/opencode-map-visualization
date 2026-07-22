import express from 'express';
import { createServer } from 'http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SSEManager } from './sse.js';
import { createDefaultState } from './state.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
export class MapServer {
    app = express();
    server = createServer(this.app);
    sseManager = new SSEManager();
    state = createDefaultState();
    clientSSEMap = new Map();
    constructor() {
        this.setupMiddleware();
        this.setupRoutes();
        this.setupSSE();
    }
    setupMiddleware() {
        this.app.use(express.json());
    }
    setupRoutes() {
        this.app.get('/', (_req, res) => {
            const htmlPath = join(__dirname, '..', 'templates', 'index.html');
            res.sendFile(htmlPath);
        });
        this.app.post('/api/viewChanged', (req, res) => {
            const { center, zoom, bounds } = req.body;
            if (center)
                this.state.view.center = center;
            if (zoom !== undefined)
                this.state.view.zoom = zoom;
            if (bounds)
                this.state.view.bounds = bounds;
            res.json({ success: true });
        });
        this.app.post('/api/screenshot', (req, res) => {
            const { image } = req.body;
            res.json({ success: true, timestamp: Date.now() });
        });
    }
    setupSSE() {
        this.app.get('/api/sse', (req, res) => {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Access-Control-Allow-Origin', '*');
            const client = this.sseManager.addClient();
            this.clientSSEMap.set(client.id, (data) => {
                res.write(`data: ${data}\n\n`);
            });
            res.write(`data: ${JSON.stringify({ type: 'connected', id: client.id })}\n\n`);
            req.on('close', () => {
                this.sseManager.removeClient(client.id);
                this.clientSSEMap.delete(client.id);
            });
            const pingInterval = setInterval(() => {
                try {
                    res.write(`data: ${JSON.stringify({ type: 'ping' })}\n\n`);
                }
                catch {
                    clearInterval(pingInterval);
                    this.sseManager.removeClient(client.id);
                    this.clientSSEMap.delete(client.id);
                }
            }, 30000);
            req.on('close', () => clearInterval(pingInterval));
        });
        this.sseManager.on('message', (clientId, message) => {
            const sendFn = this.clientSSEMap.get(clientId);
            if (sendFn) {
                try {
                    sendFn(message);
                }
                catch {
                    this.sseManager.removeClient(clientId);
                    this.clientSSEMap.delete(clientId);
                }
            }
        });
    }
    getCurrentView() {
        return { ...this.state.view };
    }
    setView(bounds, center, zoom) {
        if (bounds) {
            this.state.view.bounds = bounds;
        }
        if (center) {
            this.state.view.center = center;
        }
        if (zoom !== undefined) {
            this.state.view.zoom = zoom;
        }
        this.sseManager.broadcast('SET_VIEW', { bounds, center, zoom });
    }
    setTitle(title, options) {
        this.sseManager.broadcast('SET_TITLE', { title, options });
    }
    showMarker(coordinates, text, options) {
        const id = `marker_${Date.now()}`;
        this.state.markers.set(id, { coordinates, text, options });
        this.sseManager.broadcast('SHOW_MARKER', { id, coordinates, text, options });
        return id;
    }
    showPolygon(coordinates, options) {
        const id = `polygon_${Date.now()}`;
        this.state.polygons.set(id, { coordinates, options });
        this.sseManager.broadcast('SHOW_POLYGON', { id, coordinates, options });
        return id;
    }
    showLine(coordinates, options) {
        const id = `line_${Date.now()}`;
        this.state.lines.set(id, { coordinates, options });
        this.sseManager.broadcast('SHOW_LINE', { id, coordinates, options });
        return id;
    }
    async geolocate(query) {
        const requestId = `geo_${Date.now()}`;
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                this.sseManager.removeListener(`geolocate_${requestId}`, handler);
                resolve([]);
            }, 10000);
            const handler = (_data) => {
                clearTimeout(timeout);
                this.sseManager.removeListener(`geolocate_${requestId}`, handler);
            };
            this.sseManager.on(`geolocate_${requestId}`, handler);
            this.sseManager.broadcast('GEOLOCATE', { requestId, query });
        });
    }
    start() {
        return new Promise((resolve) => {
            this.server.listen(PORT, () => {
                console.log(`Map server running on http://localhost:${PORT}`);
                resolve();
            });
        });
    }
    stop() {
        return new Promise((resolve) => {
            this.server.close(() => resolve());
        });
    }
    getUrl() {
        return `http://localhost:${PORT}`;
    }
}
export { MapServer as default };
//# sourceMappingURL=index.js.map