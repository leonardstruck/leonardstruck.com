import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { getHomepage } from "@/data/pages"
import RichTextRenderer from "@/renderers/rich-text";
import { isLocale, setRequestLocale } from "@/lib/i18n";
import type { BaseNode } from "@/renderers/rich-text/types";

export default async function Page({ params: { locale } }: { params: { locale: string } }): Promise<JSX.Element> {
    if (!isLocale(locale)) return notFound();
    setRequestLocale(locale);
    const homepage = await getHomepage(locale);
    const queryClient = new QueryClient();

    const content = homepage.content as unknown as { root: BaseNode };
    await RichTextRenderer.prefetchNode("root", content.root, queryClient);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {RichTextRenderer.renderNode("root", content.root)}
        </HydrationBoundary>
    )
}