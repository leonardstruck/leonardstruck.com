import HeroWithImageBlock from "./blocks/hero-with-image";
import TwoColLayoutBlock from "./blocks/two-col-layout";
import { BlockRendererFactory } from "./factory";

const Renderer = new BlockRendererFactory();

// Register blocks below
Renderer.registerBlock("hero-with-image", HeroWithImageBlock)
Renderer.registerBlock("two-col-layout", TwoColLayoutBlock)

export default Renderer;