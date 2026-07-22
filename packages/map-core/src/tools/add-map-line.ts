import { tool } from '@opencode-ai/plugin';

interface AddMapLineArgs {
  coordinates: [number, number][];
  color?: string;
  weight?: number;
  opacity?: number;
  dashArray?: string;
  fitBounds?: boolean;
}

export function createAddMapLineTool(mapServerGetter: () => { showLine: (coordinates: [number, number][], options?: { color?: string; weight?: number; opacity?: number; dashArray?: string; fitBounds?: boolean }) => string } | undefined) {
  return tool({
    description: 'Add a polyline/line to the map.',
    args: {
      coordinates: tool.schema.array(tool.schema.array(tool.schema.number())),
      color: tool.schema.string().optional(),
      weight: tool.schema.number().optional(),
      opacity: tool.schema.number().optional(),
      dashArray: tool.schema.string().optional(),
      fitBounds: tool.schema.boolean().optional(),
    },
    execute: async (args: AddMapLineArgs, _ctx) => {
      const server = mapServerGetter();
      if (!server) {
        return { output: 'Map server is not available.' };
      }
      const id = server.showLine(args.coordinates, {
        color: args.color,
        weight: args.weight,
        opacity: args.opacity,
        dashArray: args.dashArray,
        fitBounds: args.fitBounds,
      });
      return { output: `Line added with id ${id} (${args.coordinates.length} points)` };
    },
  });
}
