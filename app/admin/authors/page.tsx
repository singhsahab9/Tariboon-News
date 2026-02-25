'use client'

import { useAdminStore } from '@/store/admin-store'
import Link from 'next/link'
import { formatPersianDate } from '@/utils/format'
import { Mail, FileText, Calendar } from 'lucide-react'

export default function AdminAuthorsPage() {
  const { authors, articles } = useAdminStore()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-black text-foreground">نویسندگان</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => {
          const count = articles.filter((a) => a.author.id === author.id).length
          return (
            <div key={author.id} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground shrink-0">{author.name[0]}</div>
                <div>
                  <Link href={'/author/' + author.slug} target="_blank" className="font-bold text-foreground hover:text-[#DC2626] transition-colors">{author.name}</Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{author.bio}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{author.email}</div>
                <div className="flex items-center gap-1.5"><FileText className="w-3 h-3" />{count} مقاله</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />از {formatPersianDate(author.joinedAt)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}