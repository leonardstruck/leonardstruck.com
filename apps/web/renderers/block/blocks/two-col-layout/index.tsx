import type { ITwoColLayoutBlock } from "cms/src/payload-types";
import RichTextRenderer from "@/renderers/rich-text/rich-text-renderer";
import type { RootNode } from "@/renderers/rich-text/nodes/root";

interface TwoColLayoutProps {
    block: ITwoColLayoutBlock
}

export default function TwoColLayout({ block }: TwoColLayoutProps): React.ReactNode {
    const nodes = (block as { leftCol?: { root?: RootNode }, rightCol?: { root?: RootNode } });

    return (
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
            <div className="md:col-span-6">{nodes.leftCol?.root ? <RichTextRenderer node={nodes.leftCol.root} /> : null}</div>
            <div className="md:col-span-4">{nodes.rightCol?.root ? <RichTextRenderer node={nodes.rightCol.root} /> : null}</div>
        </div>
    )
}