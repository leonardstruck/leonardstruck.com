import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import revalidate from "../../lib/revalidate";
import cache from "../../cache";
import { slug as NavigationSlug } from "../../globals/Navigation";
import { Navigation } from "payload/generated-types";

export const revalidatePage: CollectionAfterChangeHook & CollectionAfterDeleteHook = async ({ doc, req }) => {
    if (req) {
        const keysToRevalidate = [];

        // revalidate page
        keysToRevalidate.push(cache.collection.page.generateCacheKeyFromId(doc.id));
        keysToRevalidate.push(cache.collection.page.generateCacheKeyFromSlug(doc.slug));

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

        // revalidate
        await revalidate({
            tags: keysToRevalidate,
        });
    }
}