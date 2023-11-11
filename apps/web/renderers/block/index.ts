import HeroWithImageBlock from "./blocks/hero-with-image";
import { BlockRendererFactory } from "./factory";

const Renderer = new BlockRendererFactory();

// Register blocks below
Renderer.registerBlock("hero-with-image", HeroWithImageBlock)

export default Renderer;