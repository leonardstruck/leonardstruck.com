import type { Block } from "cms/src/payload-types";
import { match } from "ts-pattern";
import type { ArrElement } from "../lib/type-helpers";
import { HeroWithImage } from "./blocks/hero-with-image";

interface RenderBlockProps {
    block: ArrElement<Block["blocks"]>;
}

export default function RenderBlock({ block }: RenderBlockProps): JSX.Element {
    /* eslint-disable -- ts-pattern is not yet supported by eslint */
    return match(block)
        .with({ blockType: "hero-with-image" }, (block) => <HeroWithImage block={block} />)
        .exhaustive();
    /* eslint-enable */
};