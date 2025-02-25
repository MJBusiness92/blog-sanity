import Image from 'next/image'
import Hero from '/components/Hero'
import BlogSection from '../components/BlogSection'

export const metadata = {
  title: 'Blog AIdea Generate - Tudo sobre IA',
  description: 'Artigos e conteúdos sobre Inteligência Artificial',
  keywords: ['IA','AI', 'Inteligência Artificial', 'Blog', 'Tecnologia'],
  metadataBase: new URL('https://blog-aideagenerate.vercel.app'), // Valor do DNS Google Search Console: (google-site-verification=GBn5PDkS49nNanv_j70PDvs7p9Yj_sRP318Nue_zocs)
  verification: {
    google: 'J2lf4PqA7U2aj3L50gVc9BXfxzYVcBamX-B-wirdU-8',
  },
  openGraph: {
    title: 'Blog AIdea Genarate - Tudo sobre IA',
    description: 'Artigos e conteúdos sobre Inteligência Artificial',
    url: 'https://blog-aideagenerate.vercel.app',
    siteName: 'Blog | AIdea Generate',
    locale: 'pt-BR',
    type: 'website',
    images: [
      {
        url: 'https://blog-aidea.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog AIdea',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog AIdea Generate - Tudo sobre IA',
    description: 'Artigos e conteúdos sobre Inteligência Artificial',
    images: ['https://blog-aidea.com/twitter-image.jpg'],
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col mb-8 text-blue-600">
      <Hero />
      <BlogSection />
      
    </main>
  )
}
