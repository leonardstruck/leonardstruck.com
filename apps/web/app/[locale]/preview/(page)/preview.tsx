"use client";

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage, Page } from 'cms/src/payload-types';
import RichTextRenderer from '@/renderers/rich-text';
import type { BaseNode } from '@/renderers/rich-text/types';

function Preview({ page, serverURL }: { page: Page | Homepage | null | undefined, serverURL: string }): React.ReactNode {
    const { data } = useLivePreview({
        serverURL,
        initialData: page,
    });

    if (!data) {
        return <div>Loading...</div>;
    }

    const content = data.content as unknown as { root: BaseNode };

    return RichTextRenderer.renderNode("root", content.root);
};

export default Preview;