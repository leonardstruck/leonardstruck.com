import type { QueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";
import type { Nodes } from "./render-rich-text";
import { prefetchBlock } from "./prefetch-block";

interface PrefetchRichTextArgs {
    queryClient: QueryClient;
    content: unknown;
}

export async function prefetchRichText({ queryClient, content }: PrefetchRichTextArgs): Promise<void> {
    if (!content) return;

    const promises: Promise<void>[] = [];

    const nodes = content as Nodes;

    match(nodes)
        .with({ type: "block" }, (block) => {
            promises.push(
                prefetchBlock({ queryClient, block: block.fields.data })
            )
        })
        .with({ type: "root" }, (root) => {
            root.children.forEach((child) => {
                promises.push(
                    prefetchRichText({ queryClient, content: child })
                )
            })
        })
        .otherwise(() => { return undefined });

    await Promise.all(promises);
};

