import type { Media } from "cms/src/payload-types";
import { P, match } from "ts-pattern";

export function imageQueryKey(image: Media | number): string[] {
    const imageId = match(image)
        .with(P.number, (id) => id)
        .otherwise((im) => im.id);

    return ["image", imageId.toString()]
}