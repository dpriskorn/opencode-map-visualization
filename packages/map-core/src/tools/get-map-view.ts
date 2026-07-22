import { tool } from '@opencode-ai/plugin';

interface MapViewResult {
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
}

interface MapServerInterface {
  getCurrentView: () => MapViewResult;
}

export function createGetMapViewTool(mapServerGetter: () => MapServerInterface | undefined) {
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
