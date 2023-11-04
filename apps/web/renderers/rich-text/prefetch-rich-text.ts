import type { QueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";
import { prefetchBlock } from "../block/prefetch-block";
import type { Node } from "./types";

export interface PrefetchRichTextArgs {
    queryClient: QueryClient;
    content: Node;
}

export async function prefetchRichText({ queryClient, content }: PrefetchRichTextArgs): Promise<void> {
    const promises = match(content)
        .with({ type: "block" }, (block) => [prefetchBlock({ queryClient, block: block.fields.data })])
        .with({ type: "root" }, (root) => root.children.map((child) => prefetchRichText({ queryClient, content: child })))
        .otherwise(() => []);

    await Promise.all(promises);
}