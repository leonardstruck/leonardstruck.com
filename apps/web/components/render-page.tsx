import type { Homepage, Page } from "cms/src/payload-types";
import type { BaseNode } from "ui/components/serializer";
import { RichText } from "./rich-text";

interface RenderPageProps {
    page: Page | Homepage
}

export default function RenderPage({ page }: RenderPageProps): JSX.Element {
    const content = (page as { content?: { root?: BaseNode } }).content?.root;
    return (
        <div className="prose prose-invert">
            {content ? <RichText node={content} /> : null}
        </div>
    )
}