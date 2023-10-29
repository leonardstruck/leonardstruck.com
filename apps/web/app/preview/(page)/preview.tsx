"use client";

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage, Page } from 'cms/src/payload-types';
import type { BaseNode } from 'ui/components/serializer';
import { RichText } from '../../../components/rich-text';

function Preview({ page, serverURL }: { page: Page | Homepage | null | undefined, serverURL: string }): JSX.Element {
    const { data } = useLivePreview({
        serverURL,
        depth: 2,
        initialData: page,
    });

    const content = (data as { content?: { root?: BaseNode } }).content?.root;

    return (
        <div className="prose prose-invert">
            {content ? <RichText node={content} /> : null}
        </div>
    );
};

export default Preview;