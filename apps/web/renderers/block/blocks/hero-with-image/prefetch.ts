import { imageQueryKey } from "@/lib/query-keys"
import resolveImage from "@/actions/resolve-image"
import type { PrefetchBlockArgs } from "../../prefetch-block"

export default function prefetchHeroWithImage({ queryClient, block }: PrefetchBlockArgs): Promise<void> {
    return queryClient.prefetchQuery({
        queryKey: imageQueryKey(block.image),
        queryFn: () => resolveImage(block.image)
    });
}