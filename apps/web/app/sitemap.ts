import type { MetadataRoute } from "next";
import env from "@/lib/env";
import { getHomepage, getPages } from "@/data/pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = env.BASE_URL;

    const pages = await getPages();
    const homepage = await getHomepage();

    const homepageMeta = {
        url: baseUrl,
        lastModified: homepage.updatedAt ? new Date(homepage.updatedAt) : undefined,
        priority: 1
    }

    const pageMeta = pages.map(page => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updatedAt ? new Date(page.updatedAt) : undefined,
        priority: 0.5
    }));

    return [
        homepageMeta,
        ...pageMeta
    ]

}