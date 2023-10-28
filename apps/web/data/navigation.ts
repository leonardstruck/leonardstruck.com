import type { Config } from "cms/src/payload-types";
import cache from "cms/src/cache";
import { P, match } from "ts-pattern";
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

interface NavLink { href: string, label: string, external?: boolean }

export const getNavLinks = async (): Promise<NavLink[]> => {
    const nav = await getNavigation();

    if (!nav.links) return [];

    const links = nav.links.map(link =>
        /* eslint-disable -- this is a pattern matching library */
        match(link.link)
            .with({ type: "external" }, ({ external, label }) => ({ href: external, label, external: true }))
            .with({ type: "internal", internal: { slug: P.string } }, ({ internal, label }) => ({ href: `/${internal.slug}`, label }))
            .otherwise(({ label }) => {
                console.warn(`Cannot resolve slug of link with label "${label}"`);
                return null;
            })
        /* eslint-enable */
    ).filter((link) => link !== null) as NavLink[];

    return links;
}