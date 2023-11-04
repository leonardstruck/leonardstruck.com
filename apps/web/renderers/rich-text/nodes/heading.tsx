import useIndexedId from "@/lib/indexed-id";
import Prose from "@/components/prose";
import type { NodeWithChildren } from "../types";
import RichTextRenderer from "../rich-text-renderer";

export interface HeadingNode extends NodeWithChildren {
    type: "heading";
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface HeadingNodeProps {
    node: HeadingNode;
}

export default function Heading({ node }: HeadingNodeProps): React.ReactNode {
    const id = useIndexedId();
    const Tag = node.tag;
    return (
        <Prose>
            <Tag>
                {node.children.map((child, index) => <RichTextRenderer key={id(index)} node={child} />)}
            </Tag>
        </Prose>
    )
};