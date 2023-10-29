import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import revalidate from "../../lib/revalidate";
import cache from "../../cache";
import { slug as NavigationSlug } from "../../globals/Navigation";
import { slug as FooterSlug } from "../../globals/Footer";
import { Footer, Navigation } from "payload/generated-types";

export const revalidatePage: CollectionAfterChangeHook & CollectionAfterDeleteHook = async ({ doc, req, ...props }) => {
    if (req) {
        const keysToRevalidate = [];

        const previousDoc = props.previousDoc;

        // revalidate page
        keysToRevalidate.push(cache.collection.page.generateCacheKeyFromId(doc.id));
        keysToRevalidate.push(cache.collection.page.generateCacheKeyFromSlug(doc.slug));

        if (previousDoc && previousDoc.slug !== doc.slug) {
            keysToRevalidate.push(cache.collection.page.generateCacheKeyFromSlug(previousDoc.slug))
        }

        // check if page is referenced in menu
        const menu = await req.payload.findGlobal({ slug: NavigationSlug }) as Navigation;

        // if at least one menu item references this page, revalidate the menu
        if (menu.links.some((item) => {
            if (item.link.type !== "internal") return false;

            // check if item.link.internal is a string
            if (typeof item.link.internal === "number") {
                return item.link.internal === doc.id;
            }

            if (item.link.internal.id === doc.id) {
                return true;
            }
        })) {
            keysToRevalidate.push(cache.global[NavigationSlug]);
        }

        // check if page is referenced in footer
        const footer = await req.payload.findGlobal({ slug: FooterSlug }) as Footer;

        // if at least one footer item references this page, revalidate the footer
        if (footer.links.some((item) => {
            if (item.link.type !== "internal") return false;

            // check if item.link.internal is a string
            if (typeof item.link.internal === "number") {
                return item.link.internal === doc.id;
            }

            if (item.link.internal.id === doc.id) {
                return true;
            }
        })) {
            keysToRevalidate.push(cache.global[FooterSlug]);
        }

        // revalidate
        await revalidate({
            tags: keysToRevalidate,
        });
    }
}