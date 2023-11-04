function toPascalCase(str: string) {
    return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
        return chr.toUpperCase()
    });
}


export const generateInterfaceNameFromSlug = (slug: string, type: "block") => {
    switch (type) {
        case "block":
            return `I${toPascalCase(slug)}Block`;
    }
}