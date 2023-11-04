import { notFound } from "next/navigation";
import RenderPage from "@/components/render-page";
import { getPageBySlug, getPages } from "../../data/pages";

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

  return <RenderPage page={page} />;
}

export async function generateStaticParams(): Promise<PageProps[]> {
  const pages = await getPages();

  return pages.map((page) => ({ params: { slug: page.title } }));
}