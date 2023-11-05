import type { ITwoColLayoutBlock } from "cms/src/payload-types";
import { prefetchRichText } from "@/renderers/rich-text/prefetch-rich-text";
import type { RootNode } from "@/renderers/rich-text/nodes/root";
import type { PrefetchBlockArgs } from "../../prefetch-block"

interface PrefetchTwoColLayoutArgs extends PrefetchBlockArgs {
    block: ITwoColLayoutBlock
}

export default async function prefetchTwoColLayout({ queryClient, block }: PrefetchTwoColLayoutArgs): Promise<void> {
    const nodes = (block as { leftCol?: { root?: RootNode }, rightCol?: { root?: RootNode } });

    const promises: Promise<void>[] = [];

    if (nodes.leftCol?.root) {
        promises.push(prefetchRichText({ queryClient, content: nodes.leftCol.root }));
    }

    if (nodes.rightCol?.root) {
        promises.push(prefetchRichText({ queryClient, content: nodes.rightCol.root }));
    }

    return Promise.all(promises).then(() => Promise.resolve());
}