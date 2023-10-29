import { GlobalConfig } from "payload/types";
import revalidateGlobal from "../hooks/revalidate/revalidateGlobal";
import Link from "../fields/Link";

export const slug = "footer";

const Footer: GlobalConfig = {
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
        afterChange: [revalidateGlobal]
    }
}

export default Footer;