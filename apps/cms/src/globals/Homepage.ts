import { GlobalConfig } from "payload/types";
import Pages from "../collections/Pages";
import revalidateGlobal from "../hooks/revalidate/revalidateGlobal";

export const slug = "homepage";

const Homepage: GlobalConfig = {
    slug,
    admin: {
        livePreview: {
            url: () => { const base = process.env.PAYLOAD_LIVE_PREVIEW_URL || "http://localhost:3000"; return `${base}/preview/homepage` }
        }
    },
    versions: {
        drafts: true,
    },
    fields: Pages.fields.filter((field) => {
        if ("name" in field) {
            if (field.name == "slug") {
                return false;
            }
        }

        return true;
    }),
    hooks: {
        afterChange: [revalidateGlobal]
    }
}

export default Homepage;