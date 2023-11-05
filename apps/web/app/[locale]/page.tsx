import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getHomepage } from "@/data/pages"
import PageRenderer from "@/renderers/page/page-renderer";
import { prefetchPage } from "@/renderers/page/prefetch-page";

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();

    const queryClient = new QueryClient();
    await prefetchPage({ queryClient, page: homepage });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <PageRenderer page={homepage} />
            </div>
        </HydrationBoundary>
    )
}