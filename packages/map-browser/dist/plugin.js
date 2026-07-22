import { tool } from '@opencode-ai/plugin';
import { exec } from 'child_process';
import { MapServer } from '@opencode-map/core';
let mapServer;
let mapServerPromise;
async function getOrStartServer() {
    if (mapServer)
        return mapServer;
    if (mapServerPromise) {
        await mapServerPromise;
        return mapServer;
    }
    mapServer = new MapServer();
    mapServerPromise = mapServer.start();
    await mapServerPromise;
    return mapServer;
}
function openInBrowser(url) {
    const platform = process.platform;
    let cmd;
    if (platform === 'darwin')
        cmd = 'open';
    else if (platform === 'win32')
        cmd = 'start';
    else
        cmd = 'xdg-open';
    exec(`${cmd} ${url}`);
}
export const MapBrowserPlugin = {
    name: 'opencode-map-browser',
    async start() {
        console.log('Map browser plugin started');
    },
    tool: {
        open_map: tool({
            description: 'Open the interactive map in your default web browser.',
            args: {},
            execute: async () => {
                const server = await getOrStartServer();
                const url = server.getUrl();
                openInBrowser(url);
                return { output: `Opening map at ${url} in your browser.` };
            },
        }),
        get_map_view: tool({
            description: 'Get the current map view including center, zoom level, and bounds.',
            args: {},
            execute: async () => {
                const server = await getOrStartServer();
                const view = server.getCurrentView();
                return { output: JSON.stringify(view, null, 2) };
            },
        }),
        set_map_view: tool({
            description: 'Set the map view to specific coordinates, zoom level, or bounds.',
            args: {
                center: tool.schema.array(tool.schema.number()).optional(),
                zoom: tool.schema.number().optional(),
                bounds: tool.schema.array(tool.schema.array(tool.schema.number())).optional(),
            },
            execute: async (args) => {
                const server = await getOrStartServer();
                server.setView(args.bounds, args.center, args.zoom);
                let details = [];
                if (args.center)
                    details.push(`center: [${args.center[0]}, ${args.center[1]}]`);
                if (args.zoom !== undefined)
                    details.push(`zoom: ${args.zoom}`);
                if (args.bounds)
                    details.push(`bounds`);
                return { output: `Map view set to ${details.join(', ') || 'default'}` };
            },
        }),
        set_map_title: tool({
            description: 'Set the title displayed at the bottom right of the map.',
            args: {
                title: tool.schema.string(),
                color: tool.schema.string().optional(),
                fontSize: tool.schema.string().optional(),
                backgroundColor: tool.schema.string().optional(),
            },
            execute: async (args) => {
                const server = await getOrStartServer();
                server.setTitle(args.title, { color: args.color, fontSize: args.fontSize, backgroundColor: args.backgroundColor });
                return { output: `Map title set to "${args.title}"` };
            },
        }),
        add_map_marker: tool({
            description: 'Add a marker at specific coordinates on the map.',
            args: {
                coordinates: tool.schema.array(tool.schema.number()),
                text: tool.schema.string().optional(),
                title: tool.schema.string().optional(),
                openPopup: tool.schema.boolean().optional(),
            },
            execute: async (args) => {
                const server = await getOrStartServer();
                if (!Array.isArray(args.coordinates) || args.coordinates.length !== 2) {
                    return { output: 'Invalid coordinates. Expected [latitude, longitude].' };
                }
                const id = server.showMarker(args.coordinates, args.text || args.title, { openPopup: args.openPopup });
                return { output: `Marker added at [${args.coordinates[0]}, ${args.coordinates[1]}] with id ${id}` };
            },
        }),
        add_map_polygon: tool({
            description: 'Add a polygon to the map.',
            args: {
                coordinates: tool.schema.array(tool.schema.array(tool.schema.number())),
                color: tool.schema.string().optional(),
                fillColor: tool.schema.string().optional(),
                fillOpacity: tool.schema.number().optional(),
                weight: tool.schema.number().optional(),
                fitBounds: tool.schema.boolean().optional(),
            },
            execute: async (args) => {
                const server = await getOrStartServer();
                const id = server.showPolygon(args.coordinates, { color: args.color, fillColor: args.fillColor, fillOpacity: args.fillOpacity, weight: args.weight, fitBounds: args.fitBounds });
                return { output: `Polygon added with id ${id} (${args.coordinates.length} vertices)` };
            },
        }),
        add_map_line: tool({
            description: 'Add a polyline/line to the map.',
            args: {
                coordinates: tool.schema.array(tool.schema.array(tool.schema.number())),
                color: tool.schema.string().optional(),
                weight: tool.schema.number().optional(),
                opacity: tool.schema.number().optional(),
                dashArray: tool.schema.string().optional(),
                fitBounds: tool.schema.boolean().optional(),
            },
            execute: async (args) => {
                const server = await getOrStartServer();
                const id = server.showLine(args.coordinates, { color: args.color, weight: args.weight, opacity: args.opacity, dashArray: args.dashArray, fitBounds: args.fitBounds });
                return { output: `Line added with id ${id} (${args.coordinates.length} points)` };
            },
        }),
    },
};
//# sourceMappingURL=plugin.js.map