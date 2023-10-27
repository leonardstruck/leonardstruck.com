import type { GlobalConfig } from "payload/types";
import Link from "../fields/Link";
import revalidateGlobal from "../hooks/revalidate";
import cache from "config/cache";

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
                        return data?.link?.label || "Link";
                    }
                },
            },
            fields: [
                Link
            ]
        }
    ],
    hooks: {
        afterChange: [revalidateGlobal(slug)]
    }
}

export default Navigation;