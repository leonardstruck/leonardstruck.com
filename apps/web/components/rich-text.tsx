import { useId } from "react";
import { Serializer } from "ui";
import type { BaseNode, Parsers } from "ui/components/serializer";

interface RichTextProps {
    node: unknown;
}

export function RichText(props: RichTextProps): JSX.Element {
    return (
        <div>
            <Serializer node={props.node as Nodes} parsers={parsers} />
        </div>
    );
}


const parsers: Parsers<Nodes> = {
    root: ({ node }) => {
        return (
            <div>
                {node.children.map((child) => (
                    <Serializer key={useId()} node={child} parsers={parsers} />
                ))}
            </div>
        );
    },
    paragraph: ({ node }) => {
        return (
            <p>
                {node.children.map((child) => (
                    <Serializer key={useId()} node={child} parsers={parsers} />
                ))}
            </p>
        );
    },
    text: ({ node }) => {
        return <>{node.text}</>;
    }
};

type Nodes = RootNode | ParagraphNode | TextNode;

interface RootNode extends BaseNode {
    type: "root";
    children: Nodes[];
}

interface ParagraphNode extends BaseNode {
    type: "paragraph";
    children: Nodes[];
}

interface TextNode extends BaseNode {
    type: "text";
    text: string;
}