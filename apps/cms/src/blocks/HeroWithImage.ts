import { Block } from "payload/types";

export const slug = "hero-with-image";
const HeroWithImage: Block = {
    slug,
    interfaceName: "HeroWithImage",
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
            required: true
        }
    ]
}

export default HeroWithImage;