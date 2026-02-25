'use client'

import { useState } from 'react'
import { useAdminStore } from '@/store/admin-store'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import type { Category } from '@/types'

export default function AdminCategoriesPage() {
  const { categories, addCategory, deleteCategory } = useAdminStore()
  const [form, setForm] = useState({ name: '', slug: '', description: '', color: '#DC2626', icon: 'FolderOpen' })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.slug) { toast.error('نام و اسلاگ ضروری است'); return }
    const cat: Category = { id: Date.now().toString(), ...form }
    addCategory(cat)
    setForm({ name: '', slug: '', description: '', color: '#DC2626', icon: 'FolderOpen' })
    toast.success('دسته‌بندی اضافه شد')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-foreground">دسته‌بندی‌ها</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-bold mb-4">افزودن دسته‌بندی</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <input type="text" placeholder="نام *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring" />
            <input type="text" placeholder="اسلاگ *" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring font-mono" dir="ltr" />
            <textarea placeholder="توضیحات" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring resize-none" />
            <div className="flex items-center gap-2"><label className="text-sm text-muted-foreground">رنگ:</label><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-8 h-8 rounded cursor-pointer border-0" /></div>
            <button type="submit" className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-[#DC2626] text-white rounded-md text-sm font-medium hover:bg-[#b91c1c] transition-colors"><Plus className="w-4 h-4" />افزودن</button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="flex-1"><div className="font-medium text-sm text-foreground">{cat.name}</div><div className="text-xs text-muted-foreground font-mono">{cat.slug}</div></div>
                <span className="text-xs text-muted-foreground">{cat.count || 0} مقاله</span>
                <button onClick={() => { deleteCategory(cat.id); toast.success('دسته‌بندی حذف شد') }} className="p-1.5 text-muted-foreground hover:text-red-600 rounded hover:bg-accent transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}