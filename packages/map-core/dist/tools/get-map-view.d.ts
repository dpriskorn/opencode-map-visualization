interface MapViewResult {
    center: [number, number];
    zoom: number;
    bounds: [[number, number], [number, number]];
}
interface MapServerInterface {
    getCurrentView: () => MapViewResult;
}
export declare function createGetMapViewTool(mapServerGetter: () => MapServerInterface | undefined): {
    execute: () => Promise<{
        output: string;
    }>;
};
export {};
//# sourceMappingURL=get-map-view.d.ts.map