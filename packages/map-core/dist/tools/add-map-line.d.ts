export declare function createAddMapLineTool(mapServerGetter: () => {
    showLine: (coordinates: [number, number][], options?: {
        color?: string;
        weight?: number;
        opacity?: number;
        dashArray?: string;
        fitBounds?: boolean;
    }) => string;
} | undefined): {
    description: string;
    args: {
        coordinates: import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodNumber>>;
        color: import("zod").ZodOptional<import("zod").ZodString>;
        weight: import("zod").ZodOptional<import("zod").ZodNumber>;
        opacity: import("zod").ZodOptional<import("zod").ZodNumber>;
        dashArray: import("zod").ZodOptional<import("zod").ZodString>;
        fitBounds: import("zod").ZodOptional<import("zod").ZodBoolean>;
    };
    execute(args: {
        coordinates: number[][];
        color?: string | undefined;
        weight?: number | undefined;
        opacity?: number | undefined;
        dashArray?: string | undefined;
        fitBounds?: boolean | undefined;
    }, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
};
//# sourceMappingURL=add-map-line.d.ts.map