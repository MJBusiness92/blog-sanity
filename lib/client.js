import { createClient, groq } from "next-sanity";

export const client = createClient({
    projectId: "umn1lf84",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-06-24",
    token: process.env.SANITY_SECRET_TOKEN,
});

export async function getPosts() {
    const posts = await client.fetch(groq`
    *[_type == 'post'] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        publishedAt,
        "body": pt::text(body),
        "author": *[_type == 'author' && _id == ^.author._ref][0]{
            _id,
            name,
            "slug": slug.current,
        },
        categories[]->{
            // _id, "Em último caso, descomentar esta linha e excluir (| order(publishedAt desc) 
            name
        },
        "content": body,
    }
    `);
    return posts;
}

export async function getPostById(id) {
    const post = await client.fetch(groq`
    *[_type == 'post' && _id == $id][0]{
        _id,
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        publishedAt,
        "body": pt::text(body),
        "author": *[_type == 'author' && _id == ^.author._ref][0]{
            _id,
            name,
            "slug": slug.current,
        },
        categories[]->{
            _id,
            name
        },
        "content": body,
    }
    `, { id });
    return post;
}