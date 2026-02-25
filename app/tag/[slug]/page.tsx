import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { getTagBySlug, tags } from '@/data/tags'
import { getArticlesByTag } from '@/data/articles'
import { Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return tags.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) return { title: 'برچسب یافت نشد' }
  return { title: `برچسب: ${tag.name}` }
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const tag = getTagBySlug(slug)
  if (!tag) notFound()

  const tagArticles = getArticlesByTag(slug)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="bg-card border border-border rounded-xl p-6 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#DC2626]/10 rounded-full flex items-center justify-center">
            <Tag className="w-6 h-6 text-[#DC2626]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">{tag.name}</h1>
            <p className="text-sm text-muted-foreground">{tagArticles.length} مقاله</p>
          </div>
        </div>

        {tagArticles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Tag className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>مقاله‌ای با این برچسب یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tagArticles.map((a) => (
              <NewsCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
