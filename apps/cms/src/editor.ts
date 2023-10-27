import { lexicalEditor } from "@payloadcms/richtext-lexical"

const editor = lexicalEditor({
    features({ defaultFeatures }) {
        return [];
    },
})

export default editor;