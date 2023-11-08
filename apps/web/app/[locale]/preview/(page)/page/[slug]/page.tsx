import { notFound } from "next/navigation";
import { isLocale, setRequestLocale } from "@/lib/i18n";
import env from "@/lib/env";
import { getPageBySlug } from "@/data/pages";
import Preview from "../../preview";


interface PageParams {
    slug: string;
    locale: string;
}
interface PageProps {
    params: PageParams
};

export default async function Page({ params: { slug, locale } }: PageProps): Promise<JSX.Element> {
    if (!isLocale(locale)) notFound();
    setRequestLocale(locale);

    const page = await getPageBySlug(slug, locale, true);
    return <Preview page={page} serverURL={env.PAYLOAD_URL} />
}