import { match } from "ts-pattern";
import dynamic from "next/dynamic";
import type { Blocks } from "./blocks/types";

interface BlockRendererProps {
    block: Blocks
}

const HeroWithImageBlock = dynamic(() => import("./blocks/hero-with-image"));
const TwoColLayout = dynamic(() => import("./blocks/two-col-layout"))

export default function BlockRenderer(props: BlockRendererProps): JSX.Element {
    return match(props.block)
        .with({ blockType: "hero-with-image" }, (block) => <HeroWithImageBlock block={block} />)
        .with({ blockType: "two-col-layout" }, (block) => <TwoColLayout block={block} />)
        .exhaustive();
};