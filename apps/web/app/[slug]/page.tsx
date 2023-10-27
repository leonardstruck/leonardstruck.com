import { getPages } from "../../data/pages";

interface PageProps {
  params: {
    slug: string;
  }
};

export default function Page({ params: { slug } }: PageProps): JSX.Element {
  return (
    <main className="h-[2000px]">
      <h1>{slug}</h1>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque, ipsam culpa ipsa hic veniam aliquam nihil labore debitis repellat facere excepturi repellendus architecto earum, velit dolor numquam soluta corporis sed.
    </main>
  );
}

export async function generateStaticParams(): Promise<PageProps[]> {
  const pages = await getPages();

  return pages.map((page) => ({ params: { slug: page.title } }));
}