import { TitleOptions, MarkerOptions, PolygonOptions, LineOptions } from './state.js';
export declare class MapServer {
    private app;
    private server;
    private sseManager;
    private state;
    private clientSSEMap;
    constructor();
    private setupMiddleware;
    private setupRoutes;
    private setupSSE;
    getCurrentView(): {
        center: [number, number];
        zoom: number;
        bounds: [[number, number], [number, number]];
    };
    setView(bounds?: [[number, number], [number, number]], center?: [number, number], zoom?: number): void;
    setTitle(title: string, options?: TitleOptions): void;
    showMarker(coordinates: [number, number], text?: string, options?: MarkerOptions): string;
    showPolygon(coordinates: [number, number][], options?: PolygonOptions): string;
    showLine(coordinates: [number, number][], options?: LineOptions): string;
    geolocate(query: string): Promise<unknown[]>;
    start(): Promise<void>;
    stop(): Promise<void>;
    getUrl(): string;
}
export { MapServer as default };
//# sourceMappingURL=index.d.ts.map