import type { QueryClient } from "@tanstack/react-query";

export type NodeType = string;

export interface BaseNode {
    type: NodeType;
    key?: React.Key;
    [key: string]: unknown
}

export interface NodeWithChildren extends BaseNode {
    children: BaseNode[];
}

export interface NodeInterface<TProps extends BaseNode> {
    render: (props: TProps, key?: React.Key) => React.ReactNode;
    prefetch?: (props: TProps, queryClient: QueryClient) => Promise<void>;
}