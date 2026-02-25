'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { Pagination } from '@/components/pagination'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import { Search } from 'lucide-react'
import type { SortOption } from '@/types'

const PAGE_SIZE = 12

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setQuery(initialQuery)
    setInputValue(initialQuery)
  }, [initialQuery])

  const filtered = articles.filter((a) => {
    if (a.status !== 'published') return false
    if (selectedCat !== 'all' && a.categorySlug !== selectedCat) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q) ||
      a.tags.some((t) => t.name.toLowerCase().includes(q))
    )
  }).sort((a, b) => {
    if (sort === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sort === 'most-viewed') return b.views - a.views
    return 0
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageArticles = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(inputValue)
    setPage(1)
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="جستجو در اخبار تریبون..."
            className="w-full border border-border rounded-lg px-4 py-3 pr-12 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            dir="rtl"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {query && (
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} نتیجه برای «<span className="text-foreground font-medium">{query}</span>»
        </p>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setSelectedCat('all'); setPage(1) }}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedCat === 'all' ? 'bg-[#0F172A] text-white' : 'bg-accent text-muted-foreground'}`}
        >
          همه
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => { setSelectedCat(cat.slug); setPage(1) }}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedCat === cat.slug ? 'text-white' : 'bg-accent text-muted-foreground'}`}
            style={selectedCat === cat.slug ? { backgroundColor: cat.color } : {}}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {pageArticles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-xl mb-2">نتیجه‌ای یافت نشد</p>
          <p className="text-sm">کلمات دیگری را امتحان کنید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pageArticles.map((a) => (
            <NewsCard key={a.id} article={a} variant="featured" />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="mt-8" />
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-12 bg-accent rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-accent rounded-lg animate-pulse" />
            ))}
          </div>
        </main>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  )
}
