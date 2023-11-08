import BlockRenderer from "@/renderers/block";
import type { Blocks } from "../../block/blocks/types";
import type { BaseNode, NodeInterface } from "../types";

interface BlockNode extends BaseNode {
    fields: {
        data: Blocks
    }
}

function Component(node: BlockNode): React.ReactNode {
    return (
        <div className="pb-24">
            {BlockRenderer.renderBlock(node.fields.data.blockType, node.fields.data)}
        </div>
    )
}

const BlockNode: NodeInterface<BlockNode> = {
    render: (props, key) => <Component {...props} key={key} />,
    prefetch: async (props, queryClient) => {
        await BlockRenderer.prefetchBlock(props.fields.data.blockType, props.fields.data, queryClient);
    }
}

export default BlockNode;