'use client'

import { useState } from 'react'
import { useAdminStore } from '@/store/admin-store'
import { Check, X, Trash2 } from 'lucide-react'
import { formatPersianDate } from '@/utils/format'
import { toast } from 'sonner'

export default function AdminCommentsPage() {
  const { comments, approveComment, rejectComment, deleteComment } = useAdminStore()
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')

  const filtered = comments.filter((c) => {
    if (filter === 'pending') return !c.approved
    if (filter === 'approved') return c.approved
    return true
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-foreground">مدیریت نظرات</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{comments.filter(c => !c.approved).length} نظر در انتظار تایید</p>
      </div>
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'همه' },
          { key: 'pending', label: 'در انتظار' },
          { key: 'approved', label: 'تایید شده' },
        ].map((opt) => (
          <button key={opt.key} onClick={() => setFilter(opt.key as typeof filter)} className={'px-3 py-1.5 text-sm rounded-md transition-colors ' + (filter === opt.key ? 'bg-[#0F172A] text-white' : 'bg-card border border-border text-muted-foreground hover:text-foreground')}>{opt.label}</button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl divide-y divide-border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">نظری یافت نشد</div>
        ) : filtered.map((comment) => (
          <div key={comment.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-foreground">{comment.authorName}</span>
                  <span className="text-xs text-muted-foreground">{comment.authorEmail}</span>
                  <span className={'text-[10px] px-1.5 py-0.5 rounded ' + (comment.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>{comment.approved ? 'تایید' : 'در انتظار'}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{comment.content}</p>
                <span className="text-[10px] text-muted-foreground">{formatPersianDate(comment.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!comment.approved && (<button onClick={() => { approveComment(comment.id); toast.success('نظر تایید شد') }} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors" title="تایید"><Check className="w-4 h-4" /></button>)}
                {comment.approved && (<button onClick={() => { rejectComment(comment.id); toast.info('نظر رد شد') }} className="p-1.5 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded transition-colors" title="رد کردن"><X className="w-4 h-4" /></button>)}
                <button onClick={() => { deleteComment(comment.id); toast.success('نظر حذف شد') }} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="حذف"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}