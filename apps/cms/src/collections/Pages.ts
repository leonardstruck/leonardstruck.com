import { CollectionConfig } from "payload/types";
import { revalidatePage } from "../hooks/revalidate/revalidatePage";

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
    ],
    hooks: {
        afterChange: [revalidatePage],
        afterDelete: [revalidatePage]
    }
}

export default Pages;