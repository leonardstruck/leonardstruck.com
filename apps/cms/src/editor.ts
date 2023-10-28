import { lexicalEditor, HeadingFeature } from "@payloadcms/richtext-lexical"

const editor = lexicalEditor({
    features({ defaultFeatures }) {
        return [
            HeadingFeature({
                enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"]
            })
        ];
    },
})

export default editor;