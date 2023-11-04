"use client";

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Homepage, Page } from 'cms/src/payload-types';
import RenderPage from '@/components/render-page';

function Preview({ page, serverURL }: { page: Page | Homepage | null | undefined, serverURL: string }): JSX.Element {
    const { data } = useLivePreview({
        serverURL,
        initialData: page,
    });

    if (!data) {
        return <div>Loading...</div>;
    }

    return <RenderPage page={data} />;
};

export default Preview;