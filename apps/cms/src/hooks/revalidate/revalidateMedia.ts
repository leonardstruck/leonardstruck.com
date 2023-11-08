import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import cache from "../../cache";
import revalidate from "../../lib/revalidate";

export const revalidateMedia: CollectionAfterChangeHook & CollectionAfterDeleteHook = async ({ doc, req, ...props }) => {
    if (req) {
        await revalidate({
            tags: [cache.collection.media.generateCacheKeyFromId(doc.id)],
        })
    }
};
