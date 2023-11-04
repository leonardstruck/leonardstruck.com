import { notFound } from "next/navigation";
import { getPageBySlug, getPages } from "@/data/pages";
import PageRenderer from "@/renderers/page/page-renderer";

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

  return <PageRenderer page={page} />;
}

export async function generateStaticParams(): Promise<PageProps[]> {
  const pages = await getPages();

  return pages.map((page) => ({ params: { slug: page.title } }));
}