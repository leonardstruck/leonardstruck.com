import type { Config, Page } from "cms/src/payload-types";
import cache from "cms/src/cache";
import type { Locale } from "@/lib/i18n";
import type { PaginatedDocs } from "../lib/payload";
import payload, { getAdminAuthHeaders } from "../lib/payload"

type Homepage = Config["globals"]["homepage"];

export const getHomepage = async (locale: Locale): Promise<Homepage> => {
    const homepage = await payload<Homepage>({
        endpoint: "globals/homepage",
        query: {
            locale
        },
        headers: getAdminAuthHeaders(),
        next: {
            tags: [cache.global.homepage]
        }
    });

    return homepage;
}

export const getPages = async (locale: Locale): Promise<Page[]> => {
    const pages = await payload<PaginatedDocs<Page>>({
        endpoint: "pages",
        query: {
            locale
        },
        headers: getAdminAuthHeaders(),
    });

    return pages.docs;
}

export const getPageBySlug = async (slug: string, locale: Locale, draft?: boolean): Promise<Page | null> => {
    const page = await payload<PaginatedDocs<Page>>({
        endpoint: `pages`,
        query: {
            locale,
            where: {
                slug: {
                    equals: slug
                },
                _status: {
                    not_equals: draft ? undefined : "draft"
                }
            },
        },
        headers: getAdminAuthHeaders(),
        next: {
            tags: [cache.collection.page.generateCacheKeyFromSlug(slug)]
        }
    });

    return page.docs[0] || null;
}

