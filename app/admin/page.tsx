'use client'

import { useAdminStore } from '@/store/admin-store'
import Link from 'next/link'
import { FileText, Users, FolderOpen, MessageSquare, Eye, TrendingUp, AlertCircle } from 'lucide-react'
import { formatPersianDate, formatViewCount } from '@/utils/format'

export default function AdminDashboard() {
  const { articles, authors, categories, comments } = useAdminStore()

  const published = articles.filter((a) => a.status === 'published')
  const drafts = articles.filter((a) => a.status === 'draft')
  const pending = comments.filter((c) => !c.approved)
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0)

  const stats = [
    { icon: FileText, label: 'مقالات منتشرشده', value: published.length, color: '#2563eb', href: '/admin/articles' },
    { icon: AlertCircle, label: 'پیش‌نویس', value: drafts.length, color: '#ca8a04', href: '/admin/articles' },
    { icon: Users, label: 'نویسندگان', value: authors.length, color: '#16a34a', href: '/admin/authors' },
    { icon: MessageSquare, label: 'نظرات در انتظار', value: pending.length, color: '#dc2626', href: '/admin/comments' },
    { icon: Eye, label: 'کل بازدیدها', value: formatViewCount(totalViews), color: '#7c3aed', href: '#' },
    { icon: FolderOpen, label: 'دسته‌بندی‌ها', value: categories.length, color: '#0891b2', href: '/admin/categories' },
  ]

  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 8)

  const recentComments = [...comments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground">داشبورد</h1>
        <p className="text-sm text-muted-foreground mt-1">خلاصه وضعیت سایت تریبون</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: stat.color + '20' }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl font-black text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent articles */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-bold text-sm">آخرین مقالات</h2>
            <Link href="/admin/articles" className="text-xs text-[#DC2626] hover:underline">مشاهده همه</Link>
          </div>
          <div className="divide-y divide-border">
            {recentArticles.map((article) => (
              <div key={article.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <Link href={`/admin/articles/${article.id}/edit`} className="text-sm font-medium text-foreground hover:text-[#DC2626] line-clamp-1 transition-colors">
                    {article.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                    <span>{article.author.name}</span>
                    <span>·</span>
                    <span>{formatPersianDate(article.publishedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${article.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {article.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatViewCount(article.views)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent comments */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-bold text-sm">آخرین نظرات</h2>
            <Link href="/admin/comments" className="text-xs text-[#DC2626] hover:underline">مشاهده همه</Link>
          </div>
          <div className="divide-y divide-border">
            {recentComments.map((comment) => (
              <div key={comment.id} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{comment.authorName}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${comment.approved ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {comment.approved ? 'تایید' : 'در انتظار'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
