"use client";

import BlogCard from './BlogCard';
import { getPosts } from '/lib/client';
import Link from 'next/link';

const BlogSection = async () => {
  const posts = await getPosts();
 // console.log(posts); Não é mais necessário este console.log porque adicionamos {posts.map} acima das listas de artigos
  return (
    <div className='flex flex-col lg:px-40 px-4'>
      <div className='flex justify-center my-4 px-2'>
        <h1 className='capitalize text-4xl font-semibold'>ARTIGOS RECENTES</h1>
      </div>
      <ul className='flex flex-row flex-wrap justify-between space-y-8'>
        {posts.map((post) =>(
          // <li key={post._id} className='mt-8 mb-8'> // Motivo foi porque o precisavamos adicionar as 'Key' para garantir que cada elemento em uma lista tenha uma chave única.
          <li key={`post-${post._id}`}>
          <Link href={`/artigo/${post.slug}`} key={`link-${post._id}`}>
             <BlogCard postData={post} key={`card-${post._id}`} />
          </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default BlogSection;