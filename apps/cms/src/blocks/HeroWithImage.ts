import { Block } from "payload/types";
import { generateInterfaceNameFromSlug } from "../lib/names";

export const slug = "hero-with-image";
const HeroWithImage: Block = {
    slug,
    interfaceName: generateInterfaceNameFromSlug(slug, "block"),
    fields: [
        {
            type: "upload",
            relationTo: "media",
            name: "image",
            required: true
        },
        {
            type: "text",
            name: "title",
            required: true,
            localized: true
        }
    ]
}

export default HeroWithImage;