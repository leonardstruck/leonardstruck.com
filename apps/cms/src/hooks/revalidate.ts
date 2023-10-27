import type { GlobalAfterChangeHook } from "payload/types";
import revalidate from "../lib/revalidate";
import cache from "config/cache";

const revalidateGlobal: (slug: keyof typeof cache.global) => GlobalAfterChangeHook = (slug) => async ({ req }) => {
    if (req) {
        await revalidate({
            tags: [cache.global[slug]]
        });
    }
}

export default revalidateGlobal;