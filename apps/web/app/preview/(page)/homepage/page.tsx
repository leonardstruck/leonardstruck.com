import { getHomepage } from "../../../../data/pages"
import env from "../../../../lib/env";
import Preview from "../preview";

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();
    return <Preview page={homepage} serverURL={env.PAYLOAD_URL} />
} 