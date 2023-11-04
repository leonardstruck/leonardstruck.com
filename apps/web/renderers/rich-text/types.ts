import type { BlockNode } from "./nodes/block";
import type { HeadingNode } from "./nodes/heading";
import type { ParagraphNode } from "./nodes/paragraph";
import type { RootNode } from "./nodes/root";
import type { TextNode } from "./nodes/text";

export type Node = RootNode | ParagraphNode | TextNode | HeadingNode | BlockNode;

export interface BaseNode {
    type: string;
    [key: string]: unknown
}

export interface NodeWithChildren extends BaseNode {
    children: Node[];
}