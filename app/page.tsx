import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import Link from 'next/link'
import { Eye, TrendingUp, Tag } from 'lucide-react'
import {
  getFeaturedArticles,
  getLatestArticles,
  getPopularArticles,
  getBreakingNews,
  getArticlesByCategory,
} from '@/data/articles'
import { categories } from '@/data/categories'
import { tags } from '@/data/tags'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import Image from 'next/image'

export default function HomePage() {
  const featured = getFeaturedArticles()
  const latest = getLatestArticles(12)
  const popular = getPopularArticles(8)
  const breaking = getBreakingNews()

  // Category highlights - 3 categories with 4 articles each
  const highlightCategories = categories.slice(0, 3).map((cat) => ({
    ...cat,
    articles: getArticlesByCategory(cat.slug).slice(0, 4),
  }))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-10">
        {/* Hero Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {featured[0] && (
              <div className="lg:col-span-2">
                <NewsCard article={featured[0]} variant="hero" className="h-full min-h-[340px]" />
              </div>
            )}
            <div className="flex flex-col gap-4">
              {featured.slice(1, 3).map((a) => (
                <NewsCard key={a.id} article={a} variant="featured" />
              ))}
            </div>
          </div>
        </section>
        {/* Main content + sidebar */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#DC2626] rounded-full inline-block" />
                  آخرین اخبار
                </h2>
                <Link href="/archive" className="text-xs text-[#DC2626] hover:underline">
                  مشاهده همه
                </Link>
              </div>
              <div className="bg-card border border-border rounded-lg divide-y divide-border">
                {latest.map((article) => (
                  <div key={article.id} className="flex gap-3 p-3 hover:bg-accent/50 transition-colors group">
                    <div className="relative w-24 h-20 shrink-0 rounded overflow-hidden">
                      <Image
                        src={article.image || '/placeholder.svg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/post/${article.slug}`}
                        className="font-bold text-sm text-foreground hover:text-[#DC2626] line-clamp-2 mb-1 block leading-snug transition-colors"
                      >
                        {article.breaking && (
                          <span className="inline-block bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded ml-1.5 font-bold">فوری</span>
                        )}
                        {article.title}
                      </Link>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{formatPersianDate(article.publishedAt)}</span>
                        <span>·</span>
                        <Link href={`/category/${article.categorySlug}`} className="hover:text-foreground">
                          {article.category}
                        </Link>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />
                          {formatViewCount(article.views)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <aside className="space-y-6">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  <h3 className="font-bold text-sm">پربیننده‌ترین</h3>
                </div>
                <div className="divide-y divide-border">
                  {popular.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="flex items-start gap-2 p-3 group">
                      <span className="text-2xl font-black text-muted-foreground/30 leading-none w-6 shrink-0 text-center">
                        {(index + 1).toLocaleString('fa-IR')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/post/${article.slug}`}
                          className="text-xs font-semibold text-foreground hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors block mb-1"
                        >
                          {article.title}
                        </Link>
                        <span className="text-[10px] text-muted-foreground">{formatViewCount(article.views)} بازدید</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-[#0F172A] text-white px-4 py-3">
                  <h3 className="font-bold text-sm">دسته‌بندی‌ها</h3>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-1.5 text-xs text-foreground hover:text-[#DC2626] py-1 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <h3 className="font-bold text-sm">برچسب‌ها</h3>
                </div>
                <div className="p-3 flex flex-wrap gap-1.5">
                  {tags.slice(0, 16).map((tag) => (
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
        </section>
        {/* Category highlights */}
        {highlightCategories.map((cat) => (
          cat.articles.length > 0 && (
            <section key={cat.slug}>
              <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full inline-block" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </h2>
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-xs hover:underline"
                  style={{ color: cat.color }}
                >
                  همه اخبار {cat.name}
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cat.articles.map((article) => (
                  <NewsCard key={article.id} article={article} variant="featured" />
                ))}
              </div>
            </section>
          )
        ))}

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-[#DC2626] rounded-full inline-block" />
              محبوب‌ترین اخبار هفته
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popular.slice(0, 4).map((article) => (
              <NewsCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}