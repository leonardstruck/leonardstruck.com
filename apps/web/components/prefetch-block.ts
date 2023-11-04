import type { QueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";
import type { Block } from "cms/src/payload-types";
import type { ArrElement } from "@/lib/type-helpers";
import resolveImage from "@/actions/resolve-image";
import { imageQueryKey } from "@/lib/query-keys";

interface PrefetchBlockArgs {
    queryClient: QueryClient;
    block: ArrElement<Block["blocks"]>;
}

export async function prefetchBlock({ queryClient, ...props }: PrefetchBlockArgs): Promise<void> {

    const promises: Promise<void>[] = [];

    match(props.block)
        .with({ blockType: "hero-with-image" }, (block) => {
            promises.push(
                queryClient.prefetchQuery({
                    queryKey: imageQueryKey(block.image),
                    queryFn: () => resolveImage(block.image)
                })
            )
        })
        .otherwise(() => { return undefined });

    await Promise.all(promises);
};

