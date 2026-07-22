export declare function createSetMapViewTool(mapServerGetter: () => {
    setView: (bounds?: [number, number][], center?: [number, number], zoom?: number) => void;
} | undefined): {
    description: string;
    args: {
        center: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodNumber>>;
        zoom: import("zod").ZodOptional<import("zod").ZodNumber>;
        bounds: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodNumber>>>;
    };
    execute(args: {
        center?: number[] | undefined;
        zoom?: number | undefined;
        bounds?: number[][] | undefined;
    }, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
};
//# sourceMappingURL=set-map-view.d.ts.map