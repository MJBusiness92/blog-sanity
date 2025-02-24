// "use client";

import '/styles/globals.css';
import { getPosts } from "/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: 'Blog AIdea Generate | Artigos sobre IA',
  description: 'Artigos, materiais grátis e conteúdos sobre Inteligência Artificial',
  openGraph: {
    title: 'Blog AIdea Generate | Artigos sobre IA',
    description: 'Artigos e conteúdos sobre Inteligência Artificial',
    url: 'https://blog-aideagenerate.vercel.app',
    siteName: 'Blog | AIdea Generate',
    locale: 'pt-BR',
    type: 'website',
  },
}


/*export async function generateMetadata({ 
  params, 
}: {
  params: {
    slug: String;
  };
}) {
  try {
    const post = await getPosts(params.slug);
    if(!post) return {
      title: "Not found",
      description: "Titulo da página não encontrada"
    }
    return {
      title: post.title,
      description: post.description,
    }

  } catch (error) {
    console.error(error);
    return{
      title: "Not found",
      description: "Titulo da página não encontrada",
    }
  }
}*/

const SingleBlogPost = async ({params}) => {
  const postID = params.id[0];
  const posts = await getPosts();
  const singlePost = posts.find((post) => post._id === postID);
  
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
        <PortableText
          value={singlePost.content}
          serializers={{
            types: {
              block: props => {
                // Verifica se o estilo do bloco é 'normal'
                let className = props.node.style === 'normal' ? '' : 'pb-4';
                // Adicione outras classes do Tailwind CSS para espaçamento aqui, se necessário
                // Por exemplo, adicione 'my-4' para espaçamento superior e inferior
                className += ' gap-4'; // Adiciona espaçamento superior e inferior de 1rem (16px)
                
                // Retorna o parágrafo com a classe Tailwind CSS
                return <p className={className}>{props.children}</p>;
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default SingleBlogPost;
