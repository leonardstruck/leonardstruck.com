import { getPageBySlug, getPages } from "../../../../../../data/pages";
import Preview from "../../preview";
import env from "../../../../../../lib/env";

interface PageProps {
    params: {
        slug: string;
    }
};

export default async function Page({ params: { slug } }: PageProps): Promise<JSX.Element> {
    const page = await getPageBySlug(slug, true);
    return <Preview page={page} serverURL={env.PAYLOAD_URL} />
}

export async function generateStaticParams(): Promise<PageProps[]> {
    const pages = await getPages();

    return pages.map((page) => ({ params: { slug: page.title } }));
}