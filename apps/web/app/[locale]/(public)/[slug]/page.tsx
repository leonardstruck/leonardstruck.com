import { notFound } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPageBySlug, getPages } from "@/data/pages";
import RichTextRenderer from "@/renderers/rich-text";
import { isLocale, setRequestLocale } from "@/lib/i18n";
import type { BaseNode } from "@/renderers/rich-text/types";

interface PageParams {
  slug: string;
  locale: string;
}

interface PageProps {
  params: PageParams;
};

export default async function Page({ params: { slug, locale } }: PageProps): Promise<JSX.Element> {
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const page = await getPageBySlug(slug, locale);
  if (!page) {
    notFound();
  }

  const content = page.content as unknown as { root: BaseNode };
  const queryClient = new QueryClient();

  await RichTextRenderer.prefetchNode("root", content.root, queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {RichTextRenderer.renderNode("root", content.root)}
    </HydrationBoundary>
  )
}

interface IncomingParams {
  params: {
    locale: string
  }
}

export async function generateStaticParams({ params: { locale } }: IncomingParams): Promise<PageParams[]> {
  if (!isLocale(locale)) return notFound();

  const pages = await getPages(locale);
  return pages.map(({ slug }) => ({ slug, locale }));
} 