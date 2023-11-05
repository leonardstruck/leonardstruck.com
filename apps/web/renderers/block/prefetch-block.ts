import type { QueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";
import type { Blocks } from "./blocks/types";
import prefetchHeroWithImage from "./blocks/hero-with-image/prefetch";

export interface PrefetchBlockArgs {
    queryClient: QueryClient;
    block: Blocks
}

export async function prefetchBlock(args: PrefetchBlockArgs): Promise<void> {
    await match(args.block)
        .with({ blockType: "hero-with-image" }, () => prefetchHeroWithImage(args))
        .otherwise(() => Promise.resolve())
};

