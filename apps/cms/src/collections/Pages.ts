import { CollectionConfig } from "payload/types";
import { revalidatePage } from "../hooks/revalidate/revalidatePage";

export const slug = "pages";

const Pages: CollectionConfig = {
    slug,
    admin: {
        useAsTitle: "title",
        livePreview: {
            url: ({ data, locale }) => { const base = process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL || "http://localhost:3000"; return `${base}/${locale}/preview/page/${data.slug}` }
        }
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true
        },
        {
            name: "slug",
            type: "text",
            required: true,
            localized: true,
            unique: true
        },
        {
            name: "content",
            type: "richText",
            localized: true,
        }
    ],
    hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidatePage]
    }
}

export default Pages;