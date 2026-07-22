export declare const MapIframePlugin: {
    name: string;
    start(): Promise<void>;
    tool: {
        get_map_iframe: {
            description: string;
            args: {};
            execute(args: Record<string, never>, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
        };
        get_map_view: {
            description: string;
            args: {};
            execute(args: Record<string, never>, context: import("@opencode-ai/plugin").ToolContext): Promise<import("@opencode-ai/plugin").ToolResult>;
        };
        set_map_view: {
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
        set_map_title: {
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
        add_map_marker: {
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
        add_map_polygon: {
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
        add_map_line: {
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
    };
};
//# sourceMappingURL=plugin.d.ts.map