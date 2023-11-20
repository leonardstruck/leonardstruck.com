import { Card, VerticalRule } from "ui";
import Link from "next/link";
import { Post } from "cms/src/payload-types";
import Prose from "@/components/prose"
import { getPosts } from "@/data/posts"

async function ArticlesOverviewPage(): Promise<React.ReactElement> {
    const posts = await getPosts(true);
    return (
        <>
            <Prose className="mb-8">
                <h1>Exploring the World of Web and Mobile Development.</h1>
                <h3>Sharing my thoughts on Web and Mobile Technologies. Delving into the nuances of software development and digital trends.</h3>
                {posts.length === 0 && <p>No posts found.</p>}
            </Prose>
            <div className="flex flex-row gap-4 mt-16">
                <VerticalRule className="h-auto" />
                <div className="space-y-8 w-full">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    )
}

function Post({ post }: { post: Post }): React.ReactElement {
    return (
        <div className="flex gap-4" key={post.slug}>
            <span className="w-24 text-neutral-600 font-mono text-sm">{new Date(post.createdAt).toLocaleDateString()}</span>
            <Card className="flex-grow">
                <Prose>
                    <h2 className="text-lg font-bold font-mono">{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link className="hover:text-neutral-400" href={`/posts/${post.slug}`}>Read more</Link>
                </Prose>
            </Card>
        </div>
    )
}

export default ArticlesOverviewPage