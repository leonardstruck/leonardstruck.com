/* eslint-disable react/no-array-index-key -- temporary, payload should provide id's for each node */
import { Serializer } from "ui";
import type { BaseNode, Parsers } from "ui/components/serializer";
import type { Block } from "cms/src/payload-types";
import type { ArrElement } from "../lib/type-helpers";
import RenderBlock from "./render-block";

interface RichTextProps {
    node: unknown;
}

function Prose({ children }: { children: React.ReactNode }): JSX.Element {
    return <div className="prose prose-invert prose-neutral prose-headings:font-mono">{children}</div>;
}

export function RenderRichText(props: RichTextProps): JSX.Element {
    return (
        <Serializer node={props.node as Nodes} parsers={parsers} />
    );
}


const parsers: Parsers<Nodes> = {
    root: ({ node }) => {
        return (
            <div className="space-y-5">
                {node.children.map((child, index) => {
                    return <Serializer key={index} node={child} parsers={parsers} />
                })}
            </div>
        );
    },
    paragraph: ({ node }) => {
        return (
            <Prose>
                <p>
                    {node.children.map((child, index) => {
                        return <Serializer key={index} node={child} parsers={parsers} />
                    })}
                </p>
            </Prose>
        );
    },
    text: ({ node }) => {
        return <>{node.text}</>;
    },
    heading: ({ node }) => {
        const Tag = node.tag;
        return (
            <Prose>
                <Tag>
                    {node.children.map((child, index) => {
                        return <Serializer key={index} node={child} parsers={parsers} />
                    })}
                </Tag>
            </Prose>
        );
    },
    block: ({ node }) => {
        return <div className="pb-24"><RenderBlock block={node.fields.data} /></div>;
    }
};

export type Nodes = RootNode | ParagraphNode | TextNode | HeadingNode | BlockNode;

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

interface BlockNode extends BaseNode {
    type: "block";
    fields: {
        data: ArrElement<Block["blocks"]>;
    }
}