import type { Post } from "cms/src/payload-types"
import cache from "cms/src/cache";
import type { PaginatedDocs } from "@/lib/payload";
import payload, { getAdminAuthHeaders } from "@/lib/payload";

export const getPosts = async (draft?: boolean): Promise<Post[]> => {
    const posts = await payload<PaginatedDocs<Post>>({
        endpoint: "posts",
        query: {
            depth: 1,
            draft
        },
        next: {
            tags: [cache.collection.post.allPosts]
        },
        headers: getAdminAuthHeaders()
    });

    return posts.docs;
}

export const getPostBySlug = async (slug: string, draft?: boolean): Promise<Post | null> => {
    const posts = await payload<PaginatedDocs<Post>>({
        endpoint: "posts",
        query: {
            where: {
                slug: {
                    equals: slug
                },
                draft
            },
        },
        next: {
            tags: [cache.collection.post.generateCacheKeyFromSlug(slug)]
        },
        headers: getAdminAuthHeaders()
    });

    return posts.docs[0] || null;
}