import type { Config, Page } from "cms/src/payload-types";
import type { PaginatedDocs } from "../lib/payload";
import payload, { getAdminAuthHeaders } from "../lib/payload"

type Homepage = Config["globals"]["homepage"];

export const getHomepage = async (): Promise<Homepage> => {
    const homepage = await payload<Homepage>({
        endpoint: "globals/homepage",
        headers: getAdminAuthHeaders(),
    });

    return homepage;
}

export const getPages = async (): Promise<Page[]> => {
    const pages = await payload<PaginatedDocs<Page>>({
        endpoint: "pages",
        headers: getAdminAuthHeaders(),
    });

    return pages.docs;
}

