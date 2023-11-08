import { CollectionConfig } from "payload/types";
import { revalidateMedia } from "../hooks/revalidate/revalidateMedia";

export const slug = "media";

const Media: CollectionConfig = {
    slug,
    upload: {
        mimeTypes: ["image/*"],
        staticDir: "../uploads/media",
        imageSizes: [
            {
                name: "large",
                width: 2500,
                formatOptions: {
                    format: "webp"
                }
            },
            {
                name: "medium",
                width: 1200,
                formatOptions: {
                    format: "webp"
                }
            },
            {
                name: "small",
                width: 600,
                formatOptions: {
                    format: "webp"
                }
            }
        ]
    },
    access: {
        read: () => true,
    },
    fields: [
        { name: "alt", type: "text", localized: true }
    ],
    hooks: {
        afterChange: [
            revalidateMedia
        ],
        afterDelete: [
            revalidateMedia
        ]
    }
}

export default Media;