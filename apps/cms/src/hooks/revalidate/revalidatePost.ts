import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload/types";
import cache from "../../cache";
import revalidate from "../../lib/revalidate";

export const revalidatePost: CollectionAfterChangeHook & CollectionAfterDeleteHook = async ({ doc, req, ...props }) => {
    if (req) {
        await revalidate({
            tags: [
                cache.collection.post.generateCacheKeyFromId(doc.id),
                cache.collection.post.generateCacheKeyFromSlug(doc.slug),
                cache.collection.post.allPosts
            ],
        })
    }
};
