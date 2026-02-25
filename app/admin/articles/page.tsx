'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAdminStore } from '@/store/admin-store'
import { Plus, Search, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import { toast } from 'sonner'
import { categories } from '@/data/categories'

export default function AdminArticlesPage() {
  const { articles, deleteArticle } = useAdminStore()
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const filtered = articles.filter((a) => {
    if (selectedCat !== 'all' && a.categorySlug !== selectedCat) return false
    if (statusFilter !== 'all' && a.status !== statusFilter) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const handleDelete = (id: string) => {
    deleteArticle(id)
    setConfirmDelete(null)
    toast.success('مقاله حذف شد')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">مقالات</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} مقاله</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-[#b91c1c] transition-colors"
        >
          <Plus className="w-4 h-4" />
          مقاله جدید
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-card border border-border rounded-lg p-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-md pr-9 pl-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none"
        >
          <option value="all">همه دسته‌بندی‌ها</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-background focus:outline-none"
        >
          <option value="all">همه وضعیت‌ها</option>
          <option value="published">منتشرشده</option>
          <option value="draft">پیش‌نویس</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">عنوان</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">دسته‌بندی</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">نویسنده</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">تاریخ</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">وضعیت</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">بازدید</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((article) => (
                <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground line-clamp-1 max-w-xs">{article.title}</div>
                    {article.breaking && (
                      <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">فوری</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{article.category}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{article.author.name}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatPersianDate(article.publishedAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${article.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {article.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{formatViewCount(article.views)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/post/${article.slug}`} target="_blank" className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-accent transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link href={`/admin/articles/${article.id}/edit`} className="p-1.5 text-muted-foreground hover:text-blue-600 rounded hover:bg-accent transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      {confirmDelete === article.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(article.id)} className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded">حذف</button>
                          <button onClick={() => setConfirmDelete(null)} className="text-[10px] bg-accent px-2 py-0.5 rounded">لغو</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(article.id)} className="p-1.5 text-muted-foreground hover:text-red-600 rounded hover:bg-accent transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">مقاله‌ای یافت نشد</div>
          )}
        </div>
      </div>
    </div>
  )
}
