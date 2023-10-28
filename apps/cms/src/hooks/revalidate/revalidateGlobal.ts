import { GlobalAfterChangeHook } from "payload/types";
import revalidate from "../../lib/revalidate";
import cache from "../../cache";

const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req, global }) => {
    await revalidate({
        tags: [cache.global[global.slug]]
    })
}

export default revalidateGlobal;