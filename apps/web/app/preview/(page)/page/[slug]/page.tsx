import { notFound } from "next/navigation";
import env from "@/lib/env";
import { getPageBySlug } from "@/data/pages";
import Preview from "../../preview";


interface PageParams {
    slug: string;
}
interface PageProps {
    params: PageParams
};

export default async function Page({ params: { slug } }: PageProps): Promise<JSX.Element> {
    const page = await getPageBySlug(slug, true);
    if (!page) {
        notFound();
    }

    return <Preview page={page} serverURL={env.PAYLOAD_URL} />
}