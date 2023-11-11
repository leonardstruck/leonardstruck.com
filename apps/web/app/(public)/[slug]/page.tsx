import { notFound } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getPageBySlug, getPages } from "@/data/pages";
import RichTextRenderer from "@/renderers/rich-text";
import type { BaseNode } from "@/renderers/rich-text/types";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
};

export default async function Page({ params: { slug } }: PageProps): Promise<JSX.Element> {
  const page = await getPageBySlug(slug);
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

export async function generateStaticParams(): Promise<PageParams[]> {
  const pages = await getPages();
  return pages.map(({ slug }) => ({ slug }));
} 