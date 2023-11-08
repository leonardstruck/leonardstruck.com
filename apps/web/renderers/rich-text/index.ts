import { NodeRendererFactory } from "./factory";
import BlockNode from "./nodes/block";
import HeadingNode from "./nodes/heading";
import ParagraphNode from "./nodes/paragraph";
import RootNode from "./nodes/root";
import TextNode from "./nodes/text";

const Renderer = new NodeRendererFactory();

// Register nodes below
Renderer.registerNode("root", RootNode);
Renderer.registerNode("paragraph", ParagraphNode);
Renderer.registerNode("block", BlockNode)
Renderer.registerNode("heading", HeadingNode);
Renderer.registerNode("text", TextNode);

export default Renderer;