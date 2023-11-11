import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getHomepage } from "@/data/pages"
import RichTextRenderer from "@/renderers/rich-text";
import type { BaseNode } from "@/renderers/rich-text/types";

export default async function Page(): Promise<React.ReactElement> {
    const homepage = await getHomepage();
    const queryClient = new QueryClient();

    const content = homepage.content as unknown as { root: BaseNode };
    await RichTextRenderer.prefetchNode("root", content.root, queryClient);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {RichTextRenderer.renderNode("root", content.root)}
        </HydrationBoundary>
    )
}