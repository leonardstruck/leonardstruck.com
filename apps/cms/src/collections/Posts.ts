import { CollectionConfig } from "payload/types";
import { revalidatePost } from "../hooks/revalidate/revalidatePost";

export const slug = "posts";

const Posts: CollectionConfig = {
    slug,
    versions: {
        drafts: true,
    },
    fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true },
        { name: "excerpt", type: "textarea" },
        { name: "content", type: "richText" }
    ],
    hooks: {
        afterChange: [
            revalidatePost
        ],
        afterDelete: [
            revalidatePost
        ]
    }
}

export default Posts;