/* eslint-disable react/no-array-index-key -- temporary, payload should provide id's for each node */
import { Serializer } from "ui";
import type { BaseNode, Parsers } from "ui/components/serializer";

interface RichTextProps {
    node: unknown;
}

export function RichText(props: RichTextProps): JSX.Element {
    return (
        <div className="prose prose-invert prose-neutral prose-headings:font-mono">
            <Serializer node={props.node as Nodes} parsers={parsers} />
        </div>
    );
}


const parsers: Parsers<Nodes> = {
    root: ({ node }) => {
        return (
            <div>
                {node.children.map((child, index) => {
                    return <Serializer key={index} node={child} parsers={parsers} />
                })}
            </div>
        );
    },
    paragraph: ({ node }) => {
        return (
            <p>
                {node.children.map((child, index) => {
                    return <Serializer key={index} node={child} parsers={parsers} />
                })}
            </p>
        );
    },
    text: ({ node }) => {
        return <>{node.text}</>;
    },
    heading: ({ node }) => {
        const Tag = node.tag;
        return (
            <Tag>
                {node.children.map((child, index) => {
                    return <Serializer key={index} node={child} parsers={parsers} />
                })}
            </Tag>
        );
    }
};

type Nodes = RootNode | ParagraphNode | TextNode | HeadingNode;

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

interface HeadingNode extends BaseNode {
    type: "heading";
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: Nodes[];
}