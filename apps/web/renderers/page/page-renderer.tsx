import type { Homepage, Page } from "cms/src/payload-types";
import RichTextRenderer from "../rich-text/rich-text-renderer";
import type { RootNode } from "../rich-text/nodes/root";

interface PageRendererProps {
    page: Page | Homepage
}

export default function PageRenderer({ page }: PageRendererProps): JSX.Element {
    const content = (page as { content?: { root?: RootNode } }).content?.root;
    return (
        <div className="prose-invert">
            {content ? <RichTextRenderer node={content} /> : null}
        </div>
    )
}