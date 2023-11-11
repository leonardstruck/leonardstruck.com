import useIndexedId from "@/lib/indexed-id";
import type { NodeInterface, NodeWithChildren } from "../types";
import RichTextRenderer from "..";

function Component(node: NodeWithChildren): React.ReactNode {
    const id = useIndexedId();
    return (
        <div className="space-y-5">
            {
                node.children.map((child, i) => RichTextRenderer.renderNode(child.type, child, id(i)))
            }
        </div>
    )
}

const RootNode: NodeInterface<NodeWithChildren> = {
    render: (props, key) => <Component {...props} key={key} />
}

export default RootNode;