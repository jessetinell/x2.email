export interface Action {
    type: "forward" | "drop";
    value: Array<string>;
}

export interface ICustomAddress {
    tag: string | null;
    from: string;
    to: string;
    enabled: boolean;
}

export interface RouteProps {
    actions: Array<Action>;
    matchers: Array<{ field: string, type: string, value: string }>;
    tag: string;
}