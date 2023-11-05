import { notFound } from "next/navigation";
import { getPageBySlug, getPages } from "@/data/pages";
import PageRenderer from "@/renderers/page/page-renderer";
import { isLocale, setRequestLocale } from "@/lib/i18n";

interface PageProps {
  params: {
    slug: string;
    locale: string;
  }
};

export default async function Page({ params: { slug, locale } }: PageProps): Promise<JSX.Element> {
  if (isLocale(locale)) setRequestLocale(locale);

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