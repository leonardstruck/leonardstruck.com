import { GlobalConfig } from "payload/types";
import Pages from "../collections/Pages";
import revalidateGlobal from "../hooks/revalidate";

export const slug = "homepage";

const Homepage: GlobalConfig = {
    slug,
    fields: Pages.fields,
    hooks: {
        afterChange: [revalidateGlobal(slug)]
    }
}

export default Homepage;