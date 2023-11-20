import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/posts";

interface PostParams {
    slug: string;
}

interface PostProps {
    params: PostParams;
};

export default async function Post({ params: { slug } }: PostProps): Promise<JSX.Element> {
    const post = await getPostBySlug(slug);
    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
        </div>
    )

}
