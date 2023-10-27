const cache = {
    collection: {
        page: {
            generateCacheKeyFromId: (id: number) => `page-${id}`,
            generateCacheKeyFromSlug: (slug: string) => `page-${slug}`,
        },
    },
    global: {
        navigation: "global-navigation",
    }
}

export default cache;