interface BaseNode {
    type: string;
    [key: string]: unknown;
}

interface ParserProps<T extends BaseNode> {
    node: T;
    parsers: Parsers<T>;
    globalParser?: GlobalParser<T>;
}

type GlobalParser<T extends BaseNode> = (node: T, defaultRender: () => JSX.Element) => JSX.Element;


type Parsers<T extends BaseNode> = Record<string, (props: ParserProps<T>) => JSX.Element>;

interface SerializerProps<T extends BaseNode> extends ParserProps<T> {
    defaultParser?: (props: ParserProps<T>) => JSX.Element;
};

export function Serializer<T extends BaseNode>(props: SerializerProps<T>): JSX.Element {
    const { node, parsers, defaultParser, globalParser } = props;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    const parser = parsers[node.type] || defaultParser;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- false positive
    if (!parser) {
        throw new Error(`No parser for node type "${node.type}"`);
    }

    if (globalParser) {
        return globalParser(node, () => parser(props));
    }

    return parser(props);
}