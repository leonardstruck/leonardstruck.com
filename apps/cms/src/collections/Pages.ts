import { CollectionConfig } from "payload/types";

export const slug = "pages";

const Pages: CollectionConfig = {
    slug,
    admin: {
        useAsTitle: "title"
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
    ]
}

export default Pages;