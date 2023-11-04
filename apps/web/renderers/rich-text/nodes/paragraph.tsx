import Prose from "@/components/prose";
import useIndexedId from "@/lib/indexed-id";
import type { NodeWithChildren } from "../types";
import RichTextRenderer from "../rich-text-renderer";

export interface ParagraphNode extends NodeWithChildren {
    type: "paragraph";
}

interface ParagraphNodeProps {
    node: ParagraphNode;
}

export default function Paragraph({ node }: ParagraphNodeProps): React.ReactNode {
    const id = useIndexedId();
    return (
        <Prose>
            <p>
                {node.children.map((child, index) => <RichTextRenderer key={id(index)} node={child} />)}
            </p>
        </Prose>
    )
}