import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { getAuthorBySlug, authors } from '@/data/authors'
import { getArticlesByAuthor } from '@/data/articles'
import { formatPersianDate } from '@/utils/format'
import { User, Mail, FileText, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) return { title: 'نویسنده یافت نشد' }
  return { title: author.name, description: author.bio }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const authorArticles = getArticlesByAuthor(slug)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Author hero */}
        <div className="bg-card border border-border rounded-xl p-8 mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center text-4xl font-black text-muted-foreground shrink-0">
            {author.name[0]}
          </div>
          <div className="text-center md:text-right flex-1">
            <h1 className="text-2xl font-black text-foreground mb-2">{author.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">{author.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {author.email}
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {authorArticles.length} مقاله
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                عضویت از {formatPersianDate(author.joinedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="flex items-center justify-between border-b border-border pb-2 mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-1 h-5 bg-[#DC2626] rounded-full inline-block" />
            مقالات {author.name}
          </h2>
          <span className="text-sm text-muted-foreground">{authorArticles.length} مقاله</span>
        </div>

        {authorArticles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>هنوز مقاله‌ای منتشر نشده است</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {authorArticles.map((a) => (
              <NewsCard key={a.id} article={a} variant="featured" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
