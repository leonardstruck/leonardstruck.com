import type { QueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";
import type { Blocks } from "./blocks/types";
import prefetchHeroWithImage from "./blocks/hero-with-image/prefetch";
import prefetchTwoColLayout from "./blocks/two-col-layout/prefetch";

export interface PrefetchBlockArgs {
    queryClient: QueryClient;
    block: Blocks
}

export async function prefetchBlock(args: PrefetchBlockArgs): Promise<void> {
    await match(args)
        .with({ block: { blockType: "hero-with-image" } }, (a) => prefetchHeroWithImage(a))
        .with({ block: { blockType: "two-col-layout" } }, (a) => prefetchTwoColLayout(a))
        .otherwise(() => Promise.resolve())
};

