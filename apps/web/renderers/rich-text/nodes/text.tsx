import type { BaseNode, NodeInterface } from "../types";

interface TextNode extends BaseNode {
    text: string;
}

function Component(node: TextNode): React.ReactNode {
    return node.text;
}

const TextNode: NodeInterface<TextNode> = {
    render: (props, key) => <Component {...props} key={key} />,
}

export default TextNode;