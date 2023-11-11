import { Block } from "payload/types";
import { generateInterfaceNameFromSlug } from "../lib/names";

export const slug = "two-col-layout";
const TwoColLayout: Block = {
    slug,
    interfaceName: generateInterfaceNameFromSlug(slug, "block"),
    fields: [
        {
            type: "row",
            fields: [
                {
                    type: "richText",
                    name: "leftCol",
                    label: "Left Column",
                    admin: {
                        width: "60%"
                    }
                },
                {
                    type: "richText",
                    name: "rightCol",
                    label: "Right Column",
                    admin: {
                        width: "40%"
                    }
                }
            ]
        }
    ]
}

export default TwoColLayout;