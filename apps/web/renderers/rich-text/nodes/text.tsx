import type { BaseNode } from "../types";

export interface TextNode extends BaseNode {
    type: "text";
    text: string;
}

interface TextNodeProps {
    node: TextNode;
}

export default function Text({ node }: TextNodeProps): React.ReactNode {
    return node.text;
}
