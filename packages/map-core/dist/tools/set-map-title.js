import { tool } from '@opencode-ai/plugin';
export function createSetMapTitleTool(mapServerGetter) {
    return tool({
        description: 'Set the title displayed at the bottom right of the map.',
        args: {
            title: tool.schema.string(),
            color: tool.schema.string().optional(),
            fontSize: tool.schema.string().optional(),
            backgroundColor: tool.schema.string().optional(),
        },
        execute: async (args, _ctx) => {
            const server = mapServerGetter();
            if (!server) {
                return { output: 'Map server is not available.' };
            }
            server.setTitle(args.title, {
                color: args.color,
                fontSize: args.fontSize,
                backgroundColor: args.backgroundColor,
            });
            return { output: `Map title set to "${args.title}"` };
        },
    });
}
//# sourceMappingURL=set-map-title.js.map