import type { Config } from "cms/src/payload-types";
import cache from "cms/src/cache";
import { P, match } from "ts-pattern";
import type { FooterNavLink } from "ui/components/footer";
import payload, { getAdminAuthHeaders } from "../lib/payload"

type Footer = Config["globals"]["footer"];

export const getFooter = async (): Promise<Footer> => {
    const nav = await payload<Footer>({
        endpoint: "globals/footer",
        headers: getAdminAuthHeaders(),
        next: {
            tags: [cache.global.footer]
        }
    });

    return nav;
};


export const getFooterLinks = async (): Promise<FooterNavLink[]> => {
    const footer = await getFooter();

    if (!footer.links) return [];

    const links = footer.links.map(link =>
        /* eslint-disable -- this is a pattern matching library */
        match(link.link)
            .with({ type: "external" }, ({ external, label }) => ({ href: external, label, external: true }))
            .with({ type: "internal", internal: { slug: P.string } }, ({ internal, label }) => ({ href: `/${internal.slug}`, label }))
            .otherwise(({ label }) => {
                console.warn(`Cannot resolve slug of link with label "${label}"`);
                return null;
            })
        /* eslint-enable */
    ).filter((link) => link !== null) as FooterNavLink[];

    return links;
}