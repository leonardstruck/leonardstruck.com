import useIndexedId from "@/lib/indexed-id";
import Prose from "@/components/prose";
import type { NodeInterface, NodeWithChildren } from "../types";
import RichTextRenderer from "..";

interface HeadingNode extends NodeWithChildren {
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Component(node: HeadingNode): React.ReactNode {
    const id = useIndexedId();
    const Tag = node.tag;
    return (
        <Prose>
            <Tag>
                {node.children.map((child, index) => RichTextRenderer.renderNode(child.type, child, id(index)))}
            </Tag>
        </Prose>
    )
};

const HeadingNode: NodeInterface<HeadingNode> = {
    render: (props, key) => <Component {...props} key={key} />
}

export default HeadingNode;