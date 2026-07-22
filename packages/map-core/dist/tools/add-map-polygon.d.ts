export declare function createAddMapPolygonTool(mapServerGetter: () => {
    showPolygon: (coordinates: [number, number][], options?: {
        color?: string;
        fillColor?: string;
        fillOpacity?: number;
        weight?: number;
        fitBounds?: boolean;
    }) => string;
} | undefined): {
    description: string;
    args: {
        coordinates: import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodNumber>>;
        color: import("zod").ZodOptional<import("zod").ZodString>;
        fillColor: import("zod").ZodOptional<import("zod").ZodString>;
        fillOpacity: import("zod").ZodOptional<import("zod").ZodNumber>;
        weight: import("zod").ZodOptional<import("zod").ZodNumber>;
        fitBounds: import("zod").ZodOptional<import("zod").ZodBoolean>;
    };
    execute(args: {
        coordinates: number[][];
        color?: string | undefined;
        fillColor?: string | undefined;
        fillOpacity?: number | undefined;
        weight?: number | undefined;
        fitBounds?: boolean | undefined;
    }, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
};
//# sourceMappingURL=add-map-polygon.d.ts.map