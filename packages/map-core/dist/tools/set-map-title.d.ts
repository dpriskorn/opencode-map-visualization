export declare function createSetMapTitleTool(mapServerGetter: () => {
    setTitle: (title: string, options?: {
        color?: string;
        fontSize?: string;
        backgroundColor?: string;
    }) => void;
} | undefined): {
    description: string;
    args: {
        title: import("zod").ZodString;
        color: import("zod").ZodOptional<import("zod").ZodString>;
        fontSize: import("zod").ZodOptional<import("zod").ZodString>;
        backgroundColor: import("zod").ZodOptional<import("zod").ZodString>;
    };
    execute(args: {
        title: string;
        color?: string | undefined;
        fontSize?: string | undefined;
        backgroundColor?: string | undefined;
    }, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
};
//# sourceMappingURL=set-map-title.d.ts.map