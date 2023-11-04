import type { QueryClient } from "@tanstack/react-query";
import type { Homepage, Page } from "cms/src/payload-types";
import { prefetchRichText } from "../rich-text/prefetch-rich-text";
import type { RootNode } from "../rich-text/nodes/root";

interface PrefetchPageArgs {
    queryClient: QueryClient;
    page: Homepage | Page;
}

export async function prefetchPage({ queryClient, page }: PrefetchPageArgs): Promise<void> {
    const content = (page as { content?: { root?: RootNode } }).content?.root;
    if (!content) return;

    await prefetchRichText({ queryClient, content })
};