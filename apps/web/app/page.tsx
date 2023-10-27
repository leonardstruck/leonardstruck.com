import type { BaseNode } from "ui/components/serializer";
import { RichText } from "../components/rich-text";
import { getHomepage } from "../data/pages"

export default async function Page(): Promise<JSX.Element> {
    const homepage = await getHomepage();
    const content = (homepage.content as unknown as Record<string, unknown>).root as BaseNode;
    return (
        <div className="prose prose-invert">
            {homepage.content ? <RichText node={content} /> : null}
        </div>
    )
}