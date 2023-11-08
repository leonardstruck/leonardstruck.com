import type { QueryClient } from "@tanstack/react-query";

export type BlockType = string;

export interface BaseBlockProps {
    blockType: BlockType;
}

export interface BlockInterface<TProps extends BaseBlockProps> {
    render: (props: TProps, key?: React.Key) => React.ReactNode;
    prefetch?: (props: TProps, queryClient: QueryClient) => Promise<void>;
}

