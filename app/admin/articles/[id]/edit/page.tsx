'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store/admin-store'
import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { tags } from '@/data/tags'
import { slugify } from '@/utils/format'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { articles, updateArticle } = useAdminStore()
  const article = articles.find((a) => a.id === id)

  if (!article) return notFound()

  const [form, setForm] = useState({
    title: article.title,
    subtitle: article.subtitle || '',
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image,
    categorySlug: article.categorySlug,
    authorId: article.author.id,
    tagIds: article.tags.map((t) => t.id),
    featured: article.featured,
    breaking: article.breaking,
    status: article.status,
  })

  const toggleTag = (id: string) => {
    setForm((f) => ({
      ...f,
      tagIds: f.tagIds.includes(id) ? f.tagIds.filter((t) => t !== id) : [...f.tagIds, id],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.excerpt || !form.content) {
      toast.error('لطفاً فیلدهای ضروری را پر کنید')
      return
    }

    const cat = categories.find((c) => c.slug === form.categorySlug)!
    const author = authors.find((a) => a.id === form.authorId)!
    const selectedTags = tags.filter((t) => form.tagIds.includes(t.id))

    updateArticle(id, {
      title: form.title,
      subtitle: form.subtitle || undefined,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      image: form.image,
      category: cat.name,
      categorySlug: cat.slug,
      author,
      tags: selectedTags,
      featured: form.featured,
      breaking: form.breaking,
      status: form.status,
      updatedAt: new Date().toISOString(),
    })

    toast.success('مقاله به‌روز شد')
    router.push('/admin/articles')
  }

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/articles" className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground"><ArrowRight className="w-4 h-4" /></Link>
        <h1 className="text-2xl font-black text-foreground">ویرایش مقاله</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div><label className="block text-sm font-medium mb-1.5">عنوان *</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="block text-sm font-medium mb-1.5">زیرعنوان</label><input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
          <div><label className="block text-sm font-medium mb-1.5">خلاصه *</label><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
          <div><label className="block text-sm font-medium mb-1.5">متن کامل *</label><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y font-mono" dir="auto" /></div>
          <div><label className="block text-sm font-medium mb-1.5">آدرس تصویر</label><input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" dir="ltr" /></div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1.5">دسته‌بندی</label><select value={form.categorySlug} onChange={(e) => setForm({ ...form, categorySlug: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none">{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium mb-1.5">نویسنده</label><select value={form.authorId} onChange={(e) => setForm({ ...form, authorId: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none">{authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
          </div>
          <div><label className="block text-sm font-medium mb-2">برچسب‌ها</label><div className="flex flex-wrap gap-1.5">{tags.slice(0, 20).map((tag) => (<button key={tag.id} type="button" onClick={() => toggleTag(tag.id)} className={`text-xs px-2.5 py-1 rounded-full transition-colors ${form.tagIds.includes(tag.id) ? 'bg-[#DC2626] text-white' : 'bg-accent text-muted-foreground hover:text-foreground'}`}>{tag.name}</button>))}</div></div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 accent-[#DC2626]" /><span className="text-sm">مقاله ویژه</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.breaking} onChange={(e) => setForm({ ...form, breaking: e.target.checked })} className="w-4 h-4 accent-[#DC2626]" /><span className="text-sm">خبر فوری</span></label>
          </div>
          <div><label className="block text-sm font-medium mb-1.5">وضعیت</label><div className="flex gap-3">{(['published', 'draft'] as const).map((s) => (<label key={s} className="flex items-center gap-2 cursor-pointer"><input type="radio" name="status" value={s} checked={form.status === s} onChange={() => setForm({ ...form, status: s })} className="accent-[#DC2626]" /><span className="text-sm">{s === 'published' ? 'انتشار' : 'پیش‌نویس'}</span></label>))}</div></div>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="px-6 py-2.5 bg-[#DC2626] text-white rounded-lg text-sm font-medium hover:bg-[#b91c1c] transition-colors">ذخیره تغییرات</button>
          <Link href="/admin/articles" className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">لغو</Link>
        </div>
      </form>
    </div>
  )
}