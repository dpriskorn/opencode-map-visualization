export function createGetMapViewTool(mapServerGetter) {
    return {
        execute: async () => {
            const server = mapServerGetter();
            if (!server) {
                return { output: 'Map server is not available. Make sure the server is running.' };
            }
            const view = server.getCurrentView();
            return { output: JSON.stringify(view, null, 2) };
        },
    };
}
//# sourceMappingURL=get-map-view.js.map