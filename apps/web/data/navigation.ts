import type { Config } from "cms/src/payload-types";
import cache from "config/cache";
import payload, { getAdminAuthHeaders } from "../lib/payload"

type Navigation = Config["globals"]["navigation"];

export const getNavigation = async (): Promise<Navigation> => {
    const nav = await payload<Navigation>({
        endpoint: "globals/navigation",
        headers: getAdminAuthHeaders(),
        next: {
            tags: [cache.global.navigation]
        }
    });

    return nav;
};