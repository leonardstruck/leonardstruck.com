import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getHomepage } from "@/data/pages"
import PageRenderer from "@/renderers/page/page-renderer";
import { prefetchPage } from "@/renderers/page/prefetch-page";
import { isLocale, setRequestLocale } from "@/lib/i18n";

export default async function Page({ params: { locale } }: { params: { locale: string } }): Promise<JSX.Element> {
    if (!isLocale(locale)) return notFound();
    setRequestLocale(locale);
    const homepage = await getHomepage(locale);

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