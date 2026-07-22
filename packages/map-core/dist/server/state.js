export function createDefaultState() {
    return {
        view: {
            center: [0, 0],
            zoom: 2,
            bounds: [[-85, -180], [85, 180]],
        },
        markers: new Map(),
        polygons: new Map(),
        lines: new Map(),
    };
}
//# sourceMappingURL=state.js.map