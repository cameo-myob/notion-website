import { Client } from "@notionhq/client";

const Post = ({post}) => {
   return <pre>{JSON.stringify(post, null, 2)}</pre> 
}

export const getStaticPaths = async () => {
    const notion = new Client({
        auth: process.env.NOTION_SECRET,
    })

    const data = await notion.blocks.children.list({
        block_id: process.env.NOTION_PAGE_ID
    })

    const paths = [];

    data.results.forEach(result => {
        if(result.type === "child_page"){
            paths.push({
                params: {
                    id: result.id
                }
            })
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({params: {id}}) => {
    //  fetch post details
    const notion = new Client({
        auth: process.env.NOTION_SECRET,
    })

    const page = await notion.pages.retrieve({
        page_id: id
    })

    const title = ''
    const body = ''

    return {
        props: {
            post: page
        }
    }
}

export default Post