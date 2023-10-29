import { notFound } from "next/navigation";
import type { BaseNode } from "ui/components/serializer";
import { getPageBySlug, getPages } from "../../data/pages";
import { RichText } from "../../components/rich-text";

interface PageProps {
  params: {
    slug: string;
  }
};

export default async function Page({ params: { slug } }: PageProps): Promise<JSX.Element> {
  const page = await getPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const content = (page as { content?: { root?: BaseNode } }).content?.root;

  return (
    <>
      {content ? <RichText node={content} /> : null}
    </>
  )
}

export async function generateStaticParams(): Promise<PageProps[]> {
  const pages = await getPages();

  return pages.map((page) => ({ params: { slug: page.title } }));
}