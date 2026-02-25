import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { ShareButtons } from '@/components/share-buttons'
import { ReadingProgress } from '@/components/reading-progress'
import { CategoryBadge } from '@/components/category-badge'
import { getArticleBySlug, getRelatedArticles, articles } from '@/data/articles'
import { getPopularArticles } from '@/data/articles'
import { tags } from '@/data/tags'
import { CommentForm } from '@/components/comment-form'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Clock, User, Tag, MessageSquare, TrendingUp } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'مقاله یافت نشد' }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(article, 3)
  const popular = getPopularArticles(5)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article */}
          <article className="lg:col-span-3">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Link href="/" className="hover:text-foreground">خانه</Link>
              <span>/</span>
              <Link href={`/category/${article.categorySlug}`} className="hover:text-foreground">{article.category}</Link>
              <span>/</span>
              <span className="text-foreground line-clamp-1">{article.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-6">
              <CategoryBadge slug={article.categorySlug} name={article.category} size="md" />
              {article.breaking && (
                <span className="mr-2 inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold animate-pulse">
                  فوری
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-black text-foreground mt-3 mb-2 leading-snug">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{article.subtitle}</p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <Link href={`/author/${article.author.slug}`} className="hover:text-foreground font-medium">
                    {article.author.name}
                  </Link>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatPersianDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime} دقیقه مطالعه
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {formatViewCount(article.views)} بازدید
                </span>
              </div>

              {/* Share */}
              <div className="mt-3">
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </header>

            {/* Hero image */}
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden mb-6">
              <Image
                src={article.image || '/placeholder.svg'}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-muted-foreground text-center -mt-4 mb-6">{article.imageCaption}</p>
            )}

            {/* Content */}
            <div
              className="prose-news text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="text-xs bg-accent hover:bg-[#DC2626] hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Author box */}
            <div className="mt-8 bg-card border border-border rounded-lg p-5 flex gap-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shrink-0 text-2xl font-bold text-muted-foreground">
                {article.author.name[0]}
              </div>
              <div>
                <Link href={`/author/${article.author.slug}`} className="font-bold text-foreground hover:text-[#DC2626]">
                  {article.author.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{article.author.bio}</p>
              </div>
            </div>

            {/* Comments section */}
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#DC2626]" />
                نظرات
              </h3>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-4">نظر خود را بنویسید:</p>
                <CommentForm />
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#DC2626] rounded-full inline-block" />
                  مطالب مرتبط
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((a) => (
                    <NewsCard key={a.id} article={a} variant="featured" />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Popular */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <h3 className="font-bold text-sm">پربیننده‌ترین</h3>
              </div>
              <div className="divide-y divide-border">
                {popular.map((a, i) => (
                  <div key={a.id} className="flex gap-2 p-3 group">
                    <span className="text-xl font-black text-muted-foreground/30 w-5 shrink-0 text-center leading-tight">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <Link
                      href={`/post/${a.slug}`}
                      className="text-xs font-medium text-foreground hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                    >
                      {a.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-[#0F172A] text-white px-4 py-3">
                <h3 className="font-bold text-sm">برچسب‌های پرکاربرد</h3>
              </div>
              <div className="p-3 flex flex-wrap gap-1.5">
                {tags.slice(0, 15).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="text-[10px] bg-accent hover:bg-[#DC2626] hover:text-white px-2 py-0.5 rounded transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}