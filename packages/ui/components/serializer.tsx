export interface BaseNode {
    type: string;
    [key: string]: unknown
}

export type Parsers<T extends BaseNode> = {
    [K in T['type']]: (props: ParserProps<Extract<T, { type: K }>>) => JSX.Element;
};

interface ParserProps<T extends BaseNode, U extends T = T> {
    node: U;
    parsers: Parsers<T>;
}

export function Serializer<T extends BaseNode>(props: ParserProps<T>): JSX.Element {
    const { node, parsers } = props;
    const parser = parsers[node.type as keyof typeof parsers];

    return parser({
        ...props,
        node: node as Extract<T, { type: T['type'] }>
    });
}
