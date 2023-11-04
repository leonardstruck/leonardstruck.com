import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import RenderPage from "@/components/render-page";
import { prefetchPage } from "@/components/prefetch-page";
import { getHomepage } from "../data/pages"

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();

    const queryClient = new QueryClient();
    await prefetchPage({ queryClient, page: homepage });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <RenderPage page={homepage} />
            </div>
        </HydrationBoundary>
    )
}