import { GlobalAfterChangeHook } from "payload/types";

const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req }) => {
    console.log(doc, req);
}

export default revalidateGlobal;