'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { NewsCard } from '@/components/news-card'
import { Pagination } from '@/components/pagination'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import type { SortOption } from '@/types'

const PAGE_SIZE = 15

export default function ArchivePage() {
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)

  const published = articles.filter((a) => a.status === 'published')
  const filtered = selectedCat === 'all' ? published : published.filter((a) => a.categorySlug === selectedCat)

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    if (sort === 'oldest') return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    if (sort === 'most-viewed') return b.views - a.views
    return b.likes - a.likes
  })

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const pageArticles = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleFilter = (slug: string) => {
    setSelectedCat(slug)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-foreground mb-1">آرشیو اخبار</h1>
          <p className="text-muted-foreground text-sm">{sorted.length} خبر موجود</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedCat === 'all' ? 'bg-[#0F172A] text-white' : 'bg-accent text-muted-foreground hover:text-foreground'}`}
          >
            همه
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleFilter(cat.slug)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${selectedCat === cat.slug ? 'text-white' : 'bg-accent text-muted-foreground hover:text-foreground'}`}
              style={selectedCat === cat.slug ? { backgroundColor: cat.color } : {}}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
          {[
            { value: 'newest' as SortOption, label: 'جدیدترین' },
            { value: 'oldest' as SortOption, label: 'قدیمی‌ترین' },
            { value: 'most-viewed' as SortOption, label: 'پربیننده‌ترین' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setSort(opt.value); setPage(1) }}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${sort === opt.value ? 'bg-[#DC2626] text-white' : 'bg-accent text-muted-foreground hover:text-foreground'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {pageArticles.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl mb-2">موردی یافت نشد</p>
            <p className="text-sm">دسته‌بندی دیگری انتخاب کنید</p>
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

      <Footer />
    </div>
  )
}