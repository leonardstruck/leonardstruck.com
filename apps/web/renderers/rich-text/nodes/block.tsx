import BlockRenderer from "../../block/block-renderer";
import type { Blocks } from "../../block/blocks/types";
import type { BaseNode } from "../types";

export interface BlockNode extends BaseNode {
    type: "block";
    fields: {
        data: Blocks
    }
}

interface BlockNodeProps {
    node: BlockNode;
}

export default function Block({ node }: BlockNodeProps): React.ReactNode {
    return (
        <div className="pb-24">
            <BlockRenderer block={node.fields.data} />
        </div>
    )
}