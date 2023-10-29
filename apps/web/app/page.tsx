import type { BaseNode } from "ui/components/serializer";
import { RichText } from "../components/rich-text";
import { getHomepage } from "../data/pages"

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();
    const content = (homepage as { content?: { root?: BaseNode } }).content?.root;
    return (
        <div>
            {content ? <RichText node={content} /> : null}
        </div>
    )
}