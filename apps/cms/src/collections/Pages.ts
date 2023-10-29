import { CollectionConfig } from "payload/types";
import { revalidatePage } from "../hooks/revalidate/revalidatePage";

export const slug = "pages";

const Pages: CollectionConfig = {
    slug,
    admin: {
        useAsTitle: "title",
        livePreview: {
            url: ({ data }) => { const base = process.env.PAYLOAD_LIVE_PREVIEW_URL || "http://localhost:3000"; return `${base}/preview/page/${data.slug}` }
        }
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true
        },
        {
            name: "content",
            type: "richText"
        }
    ],
    hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidatePage]
    }
}

export default Pages;