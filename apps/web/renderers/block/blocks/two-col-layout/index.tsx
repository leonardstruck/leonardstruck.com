import type { ITwoColLayoutBlock } from "cms/src/payload-types";
import RichTextRenderer from "@/renderers/rich-text";
import type { BaseNode } from "@/renderers/rich-text/types";
import type { BlockInterface } from "../../types";

function Component(block: ITwoColLayoutBlock): React.ReactNode {
    const nodes = (block as { leftCol?: { root: BaseNode }, rightCol?: { root: BaseNode } });

    return (
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
            <div className="md:col-span-6">{nodes.leftCol?.root ? RichTextRenderer.renderNode("root", nodes.leftCol.root) : null}</div>
            <div className="md:col-span-4">{nodes.rightCol?.root ? RichTextRenderer.renderNode("root", nodes.rightCol.root) : null}</div>
        </div>
    )
}

const TwoColLayoutBlock: BlockInterface<ITwoColLayoutBlock> = {
    render: (block, key) => <Component {...block} key={key} />,
    prefetch: async (block, queryClient) => {
        const nodes = (block as { leftCol?: { root: BaseNode }, rightCol?: { root: BaseNode } });

        if (nodes.leftCol?.root) {
            await RichTextRenderer.prefetchNode("root", nodes.leftCol.root, queryClient);
        }

        if (nodes.rightCol?.root) {
            await RichTextRenderer.prefetchNode("root", nodes.rightCol.root, queryClient);
        }
    }
}

export default TwoColLayoutBlock;