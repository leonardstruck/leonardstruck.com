import { GlobalConfig } from "payload/types";
import Pages from "../collections/Pages";
import revalidateGlobal from "../hooks/revalidate";

export const slug = "homepage";

const Homepage: GlobalConfig = {
    slug,
    fields: Pages.fields.filter((field) => {
        if ("name" in field) {
            if (field.name == "slug") {
                return false;
            }
        }

        return true;
    }),
    hooks: {
        afterChange: [revalidateGlobal(slug)]
    }
}

export default Homepage;