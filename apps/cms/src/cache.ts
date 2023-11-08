const cache = {
    collection: {
        page: {
            generateCacheKeyFromId: (id: number) => `page-${id}`,
            generateCacheKeyFromSlug: (slug: string) => `page-${slug}`,
        },
        media: {
            generateCacheKeyFromId: (id: number) => `media-${id}`,
        }
    },
    global: {
        navigation: "global-navigation",
        homepage: "global-homepage",
        footer: "global-footer",
    }
}

export default cache;