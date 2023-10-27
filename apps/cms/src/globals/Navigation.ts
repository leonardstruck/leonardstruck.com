import type { GlobalConfig } from "payload/types";
import Link from "../fields/Link";

export const slug = "navigation";

const Navigation: GlobalConfig = {
    slug,
    fields: [
        {
            name: "links",
            label: "Links",
            type: "array",
            admin: {
                components: {
                    RowLabel: (doc) => {
                        const { data } = doc;
                        return data.link.label;
                    }
                },
            },
            fields: [
                Link
            ]
        }
    ]
}

export default Navigation;