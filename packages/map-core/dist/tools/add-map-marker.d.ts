export declare function createAddMapMarkerTool(mapServerGetter: () => {
    showMarker: (coordinates: [number, number], text?: string, options?: {
        openPopup?: boolean;
    }) => string;
} | undefined): {
    description: string;
    args: {
        coordinates: import("zod").ZodArray<import("zod").ZodNumber>;
        text: import("zod").ZodOptional<import("zod").ZodString>;
        title: import("zod").ZodOptional<import("zod").ZodString>;
        openPopup: import("zod").ZodOptional<import("zod").ZodBoolean>;
    };
    execute(args: {
        coordinates: number[];
        text?: string | undefined;
        title?: string | undefined;
        openPopup?: boolean | undefined;
    }, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
};
//# sourceMappingURL=add-map-marker.d.ts.map