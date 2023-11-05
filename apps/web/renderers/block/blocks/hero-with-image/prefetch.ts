import type { IHeroWithImageBlock } from "cms/src/payload-types";
import { imageQueryKey } from "@/lib/query-keys"
import resolveImage from "@/actions/resolve-image"
import type { PrefetchBlockArgs } from "../../prefetch-block"

interface PrefetchHeroWithImageArgs extends PrefetchBlockArgs {
    block: IHeroWithImageBlock
}

export default function prefetchHeroWithImage({ queryClient, block }: PrefetchHeroWithImageArgs): Promise<void> {
    return queryClient.prefetchQuery({
        queryKey: imageQueryKey(block.image),
        queryFn: () => resolveImage(block.image)
    });
}