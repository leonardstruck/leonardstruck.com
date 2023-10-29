import { lexicalEditor, HeadingFeature, BlocksFeature } from "@payloadcms/richtext-lexical"
import HeroWithImage from "./blocks/HeroWithImage";

const editor = lexicalEditor({
    features({ defaultFeatures }) {
        return [
            HeadingFeature({
                enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"]
            }),
            BlocksFeature({
                blocks: [HeroWithImage]
            })
        ];
    }
})

export default editor;