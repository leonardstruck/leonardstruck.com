const cache = {
    collection: {
        page: {
            generateCacheKeyFromId: (id: number) => `page-${id}`,
            generateCacheKeyFromSlug: (slug: string) => `page-${slug}`,
        },
        media: {
            generateCacheKeyFromId: (id: number) => `media-${id}`,
        },
        post: {
            generateCacheKeyFromId: (id: number) => `post-${id}`,
            generateCacheKeyFromSlug: (slug: string) => `post-${slug}`,
            allPosts: "post-all-posts",
        }
    },
    global: {
        navigation: "global-navigation",
        homepage: "global-homepage",
        footer: "global-footer",
    }
}

export default cache;