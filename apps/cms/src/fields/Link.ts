import type { Field } from "payload/types";

const Link: Field = {
    name: "link",
    type: "group",
    fields: [
        {
            name: "label",
            type: "text",
            required: true
        },
        {
            name: "type",
            type: "radio",
            defaultValue: "internal",
            admin: {
                layout: "horizontal"
            },
            options: [
                {
                    label: "Internal",
                    value: "internal"
                },
                {
                    label: "External",
                    value: "external"
                }
            ]
        },
        {
            name: "internal",
            type: "relationship",
            relationTo: "pages",
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData.type === "internal"
            }
        },
        {
            name: "external",
            type: "text",
            required: true,
            admin: {
                condition: (_, siblingData) => siblingData.type === "external"
            }
        }
    ]
}

export default Link;