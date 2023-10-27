import type { Config } from "cms/src/payload-types";
import payload, { getAdminAuthHeaders } from "../lib/payload"

type Navigation = Config["globals"]["navigation"];

export const getNavigation = async (): Promise<Navigation> => {
    const nav = await payload<Navigation>({
        endpoint: "globals/navigation",
        headers: getAdminAuthHeaders(),
        next: {
            revalidate: 0
        }
    });

    return nav;
};