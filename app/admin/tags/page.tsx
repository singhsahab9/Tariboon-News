'use client'

import { useState } from 'react'
import { useAdminStore } from '@/store/admin-store'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Tag } from '@/types'

export default function AdminTagsPage() {
  const { tags, addTag, deleteTag } = useAdminStore()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) { toast.error('نام و اسلاگ ضروری است'); return }
    if (tags.some((t) => t.slug === slug)) { toast.error('این اسلاگ قبلاً استفاده شده'); return }
    const tag: Tag = { id: Date.now().toString(), name, slug, count: 0 }
    addTag(tag)
    setName(''); setSlug('')
    toast.success('برچسب اضافه شد')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-foreground">برچسب‌ها</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-bold mb-4">افزودن برچسب</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <input type="text" placeholder="نام برچسب *" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            <input type="text" placeholder="اسلاگ *" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring font-mono" dir="ltr" />
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#DC2626] text-white rounded-md text-sm font-medium hover:bg-[#b91c1c] transition-colors"><Plus className="w-4 h-4" />افزودن</button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-1 bg-accent rounded-full pl-1 pr-3 py-1">
                <span className="text-sm text-foreground">{tag.name}</span>
                <span className="text-xs text-muted-foreground">({tag.count})</span>
                <button onClick={() => { deleteTag(tag.id); toast.success('برچسب حذف شد') }} className="p-0.5 text-muted-foreground hover:text-red-600 rounded-full transition-colors"><Trash2 className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}