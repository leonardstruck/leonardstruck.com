import { lexicalEditor, HeadingFeature, BlocksFeature } from "@payloadcms/richtext-lexical"
import { blocks } from "./globals/Blocks";

const editor = lexicalEditor({
    features({ defaultFeatures }) {
        return [
            HeadingFeature({
                enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"]
            }),
            BlocksFeature({
                blocks
            })
        ];
    }
})

export default editor;