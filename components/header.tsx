'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, Search, ChevronDown, Radio, Zap
} from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { categories } from '@/data/categories'
import { getBreakingNews } from '@/data/articles'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/archive', label: 'آرشیو' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const breakingNews = getBreakingNews()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-shadow duration-200',
      isScrolled ? 'shadow-lg' : ''
    )}>
      {/* Top bar */}
      <div className="bg-[#0F172A] text-white text-xs py-1.5 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-300">
            <span>
              {new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {breakingNews.length > 0 && (
              <span className="flex items-center gap-1 text-red-400">
                <Radio className="w-3 h-3 animate-pulse" />
                {breakingNews.length} خبر فوری
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Breaking news ticker */}
      {breakingNews.length > 0 && (
        <div className="bg-[#DC2626] text-white text-sm py-2 overflow-hidden">
          <div className="container mx-auto flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold whitespace-nowrap bg-white text-red-600 px-2 py-0.5 rounded text-xs shrink-0">
              <Zap className="w-3 h-3" />
              فوری
            </span>
            <div className="marquee-container flex-1">
              <div className="marquee-content">
                {breakingNews.map((n, i) => (
                  <span key={n.id}>
                    <Link href={`/post/${n.slug}`} className="hover:underline">
                      {n.title}
                    </Link>
                    {i < breakingNews.length - 1 && (
                      <span className="mx-6 opacity-50">|</span>
                    )}
                  </span>
                ))}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {breakingNews.map((n, i) => (
                  <span key={`dup-${n.id}`}>
                    <Link href={`/post/${n.slug}`} className="hover:underline">
                      {n.title}
                    </Link>
                    {i < breakingNews.length - 1 && (
                      <span className="mx-6 opacity-50">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#DC2626] rounded flex items-center justify-center">
              <span className="text-white font-black text-sm">ت</span>
            </div>
            <span className="text-xl font-black text-foreground tracking-tight">تریبون</span>
          </Link>
          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* Categories dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground hover:text-foreground"
                onClick={() => setIsCatOpen(!isCatOpen)}
              >
                دسته‌بندی‌ها
                <ChevronDown className={cn('w-4 h-4 transition-transform', isCatOpen && 'rotate-180')} />
              </Button>
              {isCatOpen && (
                <div
                  className="absolute top-full mt-1 right-0 w-64 bg-popover border border-border rounded-lg shadow-lg p-2 grid grid-cols-2 gap-1 z-50"
                  onMouseLeave={() => setIsCatOpen(false)}
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                      onClick={() => setIsCatOpen(false)}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search + Admin */}
          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو..."
                  className="bg-accent border border-border rounded-md px-3 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring"
                  dir="rtl"
                />
                <Button type="submit" size="icon" variant="ghost" className="w-8 h-8">
                  <Search className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            <Link
              href="/admin"
              className="hidden md:inline-flex items-center px-3 py-1.5 text-xs font-medium bg-[#0F172A] text-white rounded-md hover:bg-[#1e293b] transition-colors"
            >
              پنل مدیریت
            </Link>
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-card border-b border-border hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md transition-colors',
                  pathname === `/category/${cat.slug}`
                    ? 'bg-[#DC2626] text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              <p className="px-3 py-1 text-xs text-muted-foreground font-medium">دسته‌بندی‌ها</p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/admin"
              className="block mt-2 px-3 py-2 text-sm font-medium bg-[#0F172A] text-white rounded-md text-center"
            >
              پنل مدیریت
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}