import { tool } from '@opencode-ai/plugin';

interface AddMapPolygonArgs {
  coordinates: [number, number][];
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  weight?: number;
  fitBounds?: boolean;
}

export function createAddMapPolygonTool(mapServerGetter: () => { showPolygon: (coordinates: [number, number][], options?: { color?: string; fillColor?: string; fillOpacity?: number; weight?: number; fitBounds?: boolean }) => string } | undefined) {
  return tool({
    description: 'Add a polygon to the map.',
    args: {
      coordinates: tool.schema.array(tool.schema.array(tool.schema.number())),
      color: tool.schema.string().optional(),
      fillColor: tool.schema.string().optional(),
      fillOpacity: tool.schema.number().optional(),
      weight: tool.schema.number().optional(),
      fitBounds: tool.schema.boolean().optional(),
    },
    execute: async (args: AddMapPolygonArgs, _ctx) => {
      const server = mapServerGetter();
      if (!server) {
        return { output: 'Map server is not available.' };
      }
      const id = server.showPolygon(args.coordinates, {
        color: args.color,
        fillColor: args.fillColor,
        fillOpacity: args.fillOpacity,
        weight: args.weight,
        fitBounds: args.fitBounds,
      });
      return { output: `Polygon added with id ${id} (${args.coordinates.length} vertices)` };
    },
  });
}
