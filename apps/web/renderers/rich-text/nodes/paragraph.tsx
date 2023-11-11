import Prose from "@/components/prose";
import useIndexedId from "@/lib/indexed-id";
import type { NodeInterface, NodeWithChildren } from "../types";
import RichTextRenderer from "..";

function Component(node: NodeWithChildren): React.ReactNode {
    const id = useIndexedId();
    return (
        <Prose>
            <p>
                {node.children.map((child, i) => RichTextRenderer.renderNode(child.type, child, id(i)))}
            </p>
        </Prose>
    )
}

const ParagraphNode: NodeInterface<NodeWithChildren> = {
    render: (props, key) => <Component {...props} key={key} />
}

export default ParagraphNode;