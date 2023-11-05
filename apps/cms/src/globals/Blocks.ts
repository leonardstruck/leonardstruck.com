/*

THE PURPOSE OF THIS GLOBAL IS ONLY TO REGISTER BLOCKS SO THEIR TYPES ARE GENERATED
IN CASE THE BLOCKSFEATURE IN LEXICALEDITOR EVER PASSES DOWN THE BLOCKS TO THE TYPE GENERATOR, THIS GLOBAL CAN BE REMOVED

*/

import { GlobalConfig } from "payload/types";
import HeroWithImage from "../blocks/HeroWithImage";
import TwoColLayout from "../blocks/TwoColLayout";

export const slug = "blocks";

export const blocks = [HeroWithImage, TwoColLayout]

const Blocks: GlobalConfig = {
    slug,
    fields: [
        { type: "blocks", name: "blocks", blocks }
    ],
    access: {
        read: () => false,
        update: () => false,
    }
}

export default Blocks;