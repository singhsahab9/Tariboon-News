'use client'

import Link from 'next/link'
import { categories } from '@/data/categories'
import { ArrowUp } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'گیت‌هاب', href: 'https://github.com/MiladJoodi/Tariboon-News' },
  { label: 'لینکدین', href: 'https://www.linkedin.com/in/joodi/' },
]

export function Footer() {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' })

  return (
    <footer className="bg-[#0F172A] text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#DC2626] rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">ت</span>
              </div>
              <span className="text-xl font-black text-white">تریبون</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              تریبون پایگاه خبری جامع برای پوشش آخرین اخبار ایران و جهان است. ما متعهد به ارائه اخبار دقیق، سریع و بی‌طرفانه هستیم.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'صفحه اصلی' },
                { href: '/archive', label: 'آرشیو اخبار' },
                { href: '/search', label: 'جستجو' },
                { href: '/about', label: 'درباره ما' },
                { href: '/contact', label: 'تماس با ما' },
                { href: '/admin', label: 'پنل مدیریت' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">دسته‌بندی‌ها</h3>
            <ul className="space-y-2 text-sm grid grid-cols-2 gap-x-4">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">لینک‌ها</h3>
            <div className="flex flex-col gap-2 mt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between text-xs text-gray-500">
          <span>© {year} تریبون — تمام حقوق محفوظ است</span>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-1 hover:text-gray-300 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            بازگشت به بالا
          </a>
        </div>
      </div>
    </footer>
  )
}