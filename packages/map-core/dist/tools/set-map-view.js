import { tool } from '@opencode-ai/plugin';
export function createSetMapViewTool(mapServerGetter) {
    return tool({
        description: 'Set the map view to specific coordinates, zoom level, or bounds.',
        args: {
            center: tool.schema.array(tool.schema.number()).optional(),
            zoom: tool.schema.number().optional(),
            bounds: tool.schema.array(tool.schema.array(tool.schema.number())).optional(),
        },
        execute: async (args, _ctx) => {
            const server = mapServerGetter();
            if (!server) {
                return { output: 'Map server is not available.' };
            }
            server.setView(args.bounds, args.center, args.zoom);
            let details = [];
            if (args.center)
                details.push(`center: [${args.center[0]}, ${args.center[1]}]`);
            if (args.zoom !== undefined)
                details.push(`zoom: ${args.zoom}`);
            if (args.bounds)
                details.push(`bounds: [${args.bounds[0]}, ${args.bounds[1]}]`);
            return { output: `Map view set to ${details.join(', ')}` };
        },
    });
}
//# sourceMappingURL=set-map-view.js.map