"use server";

import { z } from "zod";
import { mediaSchema } from "cms/src/payload-zod-schema";
import type { Media } from "cms/src/payload-types";
import cache from "cms/src/cache";
import { publicAction } from "@/lib/safe-action";
import payload, { getAdminAuthHeaders } from "@/lib/payload";

const schema = z.union([z.number(), mediaSchema]);

const resolveImage = publicAction(schema, async (input) => {
    // check if media is number or media object
    // if number, fetch media object
    // if media object, use it

    if (typeof input === "number") {
        // fetch media object
        const image = await payload<Media>({
            endpoint: `/media/${input}`,
            headers: getAdminAuthHeaders(),
            next: {
                tags: [cache.collection.media.generateCacheKeyFromId(input)]
            }
        });

        return appendTimestamp(image);
    }

    return appendTimestamp(input);
});

const appendTimestamp = (image: Media): Media => {
    if (image.url) {
        image.url += `?t=${Date.now()}`;
    }

    if (image.sizes?.large?.url) {
        image.sizes.large.url += `?t=${Date.now()}`;
    }

    if (image.sizes?.medium?.url) {
        image.sizes.medium.url += `?t=${Date.now()}`;
    }

    if (image.sizes?.small?.url) {
        image.sizes.small.url += `?t=${Date.now()}`;
    }

    return image;
}


export default resolveImage;