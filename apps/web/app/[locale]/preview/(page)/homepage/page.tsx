import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getHomepage } from "../../../../../data/pages"
import env from "../../../../../lib/env";
import Preview from "../preview";

interface PageProps {
    params: {
        locale: string;
    }
};

export default async function Page({ params: { locale } }: PageProps): Promise<JSX.Element> {
    if (!isLocale(locale)) notFound();
    const homepage = await getHomepage(locale);
    return <Preview page={homepage} serverURL={env.PAYLOAD_URL} />
} 