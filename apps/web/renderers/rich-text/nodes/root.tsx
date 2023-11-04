import useIndexedId from "@/lib/indexed-id";
import type { NodeWithChildren } from "../types";
import RichTextRenderer from "../rich-text-renderer";

export interface RootNode extends NodeWithChildren {
    type: "root";
}

interface RootNodeProps {
    node: RootNode;
}

export default function Root({ node }: RootNodeProps): React.ReactNode {
    const id = useIndexedId();
    return (
        <div className="space-y-5">
            {node.children.map((child, index) => <RichTextRenderer key={id(index)} node={child} />)}
        </div>
    )
}