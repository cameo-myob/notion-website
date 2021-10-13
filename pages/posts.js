import { Client } from "@notionhq/client";
import Link from "next/link"

const PostPage = ({posts}) => {
    return posts.map((post) => (
        <p key={post.id}>
            <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
            </Link>
        </p>
    ))
}

export const getStaticProps = async () => {
    const notion = new Client({
        auth: process.env.NOTION_SECRET,
    })

    const data = await notion.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID
    })

    const posts = []

    data.results.forEach(result => {
        if (result.type === "child_page") {
            posts.push({
                id: result.id,
                title: result.child_page.title
            })
        }
    })

    return {
        props: {
            posts,
        }
    }
}

export default PostPage;