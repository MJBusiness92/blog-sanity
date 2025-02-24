

import '/styles/globals.css';
import { getPosts } from "/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Post não encontrado | Blog AIdea',
      description: 'O artigo que você está procurando não foi encontrado.',
    };
  }
// ESTRUTURA ADICIONADA RECENTEMENTE
  return {
    title: `${post.title} | Blog AIdea`,
    description: post.description || post.body?.substring(0, 160) || '', // Antes a linha estava nessa forma "post.body.substring(0, 160)"
    openGraph: {
      title: post.title,
      description: post.description || post.body?.substring(0, 160) || '', // Antes a linha estava nessa forma "post.body.substring(0, 160)"
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name].filter(Boolean), // Antes a linha constava nesta forma [post.author?.name]
      images: [
        {
          url: post.image || 'https://blog-aidea.com/default-og.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.body?.substring(0, 160) || '', 
      images: [post.image || 'https://blog-aidea.com/default-twitter.jpg'],
    },
  };
}

// ADICIONADO RECENTEMENTE -  Use um componente cliente separado para partes interativas, se necessário
const ClientPortableText = ({ value }) => {
  return <PortableText value={value} />;
};


const SingleBlogPost = async ({params}) => {
  const { slug } = params;
  const posts = await getPosts();
  const singlePost = posts.find((post) => post.slug === slug);
  
  return (
    <div className="flex space-y-8 my-8 flex-col lg:px-96 px-4 min-h-screen">
      <div className="w-full flex flex-col justify-center space-y-8 items-center">
        <h1 className="text-3xl text-primary-dark font-normal drop-shadow-md">
          {singlePost && singlePost.title}
        </h1>
        <Image
          src={singlePost && singlePost.image}
          width={600}
          height={200}
          alt={singlePost && singlePost.title}
          className="backdrop-brightness-100"
        />
      </div>
      
      <div>
        <h2 className='leading-relaxed'>
          Por{" "}
          <span className="font-semibold text-primary-brand">
            {singlePost && singlePost.author && singlePost.author.name}
          </span>
        </h2>
      </div>
      
      {singlePost && singlePost.content && (
        <PortableText value={singlePost.content} />
      )}
    </div>
  );
};

export default SingleBlogPost;
