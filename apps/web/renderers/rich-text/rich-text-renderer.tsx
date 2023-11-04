import { match } from "ts-pattern";
import dynamic from "next/dynamic";
import type { Node } from "./types";

interface RichTextRendererProps {
    node: Node
}

const Root = dynamic(() => import("./nodes/root"));
const Paragraph = dynamic(() => import("./nodes/paragraph"));
const Text = dynamic(() => import("./nodes/text"));
const Heading = dynamic(() => import("./nodes/heading"));
const Block = dynamic(() => import("./nodes/block"));

export default function RichTextRenderer(props: RichTextRendererProps): React.ReactNode {
    return match(props.node)
        .with({ type: "root" }, (node) => <Root node={node} />)
        .with({ type: "paragraph" }, (node) => <Paragraph node={node} />)
        .with({ type: "text" }, (node) => <Text node={node} />)
        .with({ type: "heading" }, (node) => <Heading node={node} />)
        .with({ type: "block" }, (node) => <Block node={node} />)
        .exhaustive();
}