import { GlobalConfig } from "payload/types";
import Pages from "../collections/Pages";
import revalidateGlobal from "../hooks/revalidate/revalidateGlobal";

export const slug = "homepage";

const Homepage: GlobalConfig = {
    slug,
    admin: {
        livePreview: {
            url: ({ locale }) => `${process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL || "http://localhost:3000"}/${locale}/preview/homepage`
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