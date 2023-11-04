import type { QueryClient } from "@tanstack/react-query";
import type { Homepage, Page } from "cms/src/payload-types";
import type { BaseNode } from "ui/components/serializer";
import { prefetchRichText } from "./prefetch-rich-text";

interface PrefetchPageArgs {
    queryClient: QueryClient;
    page: Homepage | Page;
}

export async function prefetchPage({ queryClient, page }: PrefetchPageArgs): Promise<void> {
    const content = (page as { content?: { root?: BaseNode } }).content?.root;

    await Promise.all(
        [prefetchRichText({ queryClient, content })]
    )
};