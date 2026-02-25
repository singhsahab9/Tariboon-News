'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, FolderOpen, Tag, Users, MessageSquare, Settings, ChevronLeft, Menu, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'داشبورد' },
  { href: '/admin/articles', icon: FileText, label: 'مقالات' },
  { href: '/admin/categories', icon: FolderOpen, label: 'دسته‌بندی‌ها' },
  { href: '/admin/tags', icon: Tag, label: 'برچسب‌ها' },
  { href: '/admin/authors', icon: Users, label: 'نویسندگان' },
  { href: '/admin/comments', icon: MessageSquare, label: 'نظرات' },
  { href: '/admin/settings', icon: Settings, label: 'تنظیمات' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-muted flex" dir="rtl">
      {/* Sidebar */}
      <aside className={cn(
        'bg-[#0F172A] text-white flex flex-col transition-all duration-200 shrink-0',
        sidebarOpen ? 'w-56' : 'w-14'
      )}>
        {/* Logo */}
        <div className="h-14 flex items-center gap-2 px-3 border-b border-white/10">
          <div className="w-8 h-8 bg-[#DC2626] rounded flex items-center justify-center shrink-0">
            <span className="font-black text-sm">ت</span>
          </div>
          {sidebarOpen && <span className="font-black text-lg">تریبون</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-[#DC2626] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Collapse button */}
        <div className="px-2 pb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
          >
            <ChevronLeft className={cn('w-4 h-4 transition-transform', !sidebarOpen && 'rotate-180')} />
            {sidebarOpen && 'بستن'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="text-sm font-medium text-foreground">پنل مدیریت تریبون</div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              مشاهده سایت
            </Link>
            <div className="w-7 h-7 bg-[#DC2626] rounded-full flex items-center justify-center text-white text-xs font-bold">
              م
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      <Toaster position="bottom-left" richColors dir="rtl" />
    </div>
  )
}
