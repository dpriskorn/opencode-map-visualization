import { tool } from '@opencode-ai/plugin';

interface AddMapMarkerArgs {
  coordinates: [number, number];
  text?: string;
  title?: string;
  openPopup?: boolean;
}

export function createAddMapMarkerTool(mapServerGetter: () => { showMarker: (coordinates: [number, number], text?: string, options?: { openPopup?: boolean }) => string } | undefined) {
  return tool({
    description: 'Add a marker at specific coordinates on the map.',
    args: {
      coordinates: tool.schema.array(tool.schema.number()),
      text: tool.schema.string().optional(),
      title: tool.schema.string().optional(),
      openPopup: tool.schema.boolean().optional(),
    },
    execute: async (args: AddMapMarkerArgs, _ctx) => {
      const server = mapServerGetter();
      if (!server) {
        return { output: 'Map server is not available.' };
      }
      if (!Array.isArray(args.coordinates) || args.coordinates.length !== 2) {
        return { output: 'Invalid coordinates. Expected [latitude, longitude].' };
      }
      const id = server.showMarker(args.coordinates, args.text || args.title, { openPopup: args.openPopup });
      return { output: `Marker added at [${args.coordinates[0]}, ${args.coordinates[1]}] with id ${id}${args.text ? ` and text "${args.text}"` : ''}` };
    },
  });
}
