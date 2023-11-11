import type { QueryClient } from "@tanstack/react-query";
import type { BlockInterface, BaseBlockProps, BlockType } from "./types";

export class BlockRendererFactory {
    private blockTypes = new Map<BlockType, BlockInterface<BaseBlockProps>>();

    public registerBlock<TProps extends BaseBlockProps>(blockType: BlockType, block: BlockInterface<TProps>): void {
        this.blockTypes.set(blockType, block as BlockInterface<BaseBlockProps>);
    }

    public getBlock(blockType: BlockType): BlockInterface<BaseBlockProps> {
        const block = this.blockTypes.get(blockType);
        if (!block) {
            throw new Error(`Block with type ${blockType} not found`);
        }

        return block;
    }

    public renderBlock(blockType: BlockType, props: BaseBlockProps, key?: React.Key): React.ReactNode {
        const block = this.getBlock(blockType);
        return block.render(props, key);
    }

    public prefetchBlock(blockType: BlockType, props: BaseBlockProps, queryClient: QueryClient): Promise<void> {
        const block = this.getBlock(blockType);
        return block.prefetch?.(props, queryClient) ?? Promise.resolve();
    }
};
