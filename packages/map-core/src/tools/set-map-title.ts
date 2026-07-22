import { tool } from '@opencode-ai/plugin';

interface SetMapTitleArgs {
  title: string;
  color?: string;
  fontSize?: string;
  backgroundColor?: string;
}

export function createSetMapTitleTool(mapServerGetter: () => { setTitle: (title: string, options?: { color?: string; fontSize?: string; backgroundColor?: string }) => void } | undefined) {
  return tool({
    description: 'Set the title displayed at the bottom right of the map.',
    args: {
      title: tool.schema.string(),
      color: tool.schema.string().optional(),
      fontSize: tool.schema.string().optional(),
      backgroundColor: tool.schema.string().optional(),
    },
    execute: async (args: SetMapTitleArgs, _ctx) => {
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
