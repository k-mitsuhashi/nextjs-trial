import { getArticles, getArticleBySlug } from '@/lib/newt'
import type { Metadata } from 'next'
import type { Article } from '@/types/article'
import "./page.css";

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const article = await getArticleBySlug(slug)

  return {
    title: article?.title,
    description: '投稿詳細ページです',
  }
}

export default async function Article({ params }: Props) {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  if (!article) return

  return (
    <main className='md:container md:mx-auto'>
      <h1>{article.title}</h1>
      <hr></hr>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </main>
  )
}
