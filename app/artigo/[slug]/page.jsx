"use client";

import '/styles/globals.css';
import { getPosts } from "/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

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
