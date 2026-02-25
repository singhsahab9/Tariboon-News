import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { authors } from '@/data/authors'
import { articles } from '@/data/articles'
import { categories } from '@/data/categories'
import Link from 'next/link'
import { FileText, Users, Layers, Award } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'درباره ما',
  description: 'درباره تریبون، تیم ما و ماموریت ما',
}

export default function AboutPage() {
  const stats = [
    { icon: FileText, label: 'مقاله منتشرشده', value: articles.filter(a => a.status === 'published').length + '+' },
    { icon: Users, label: 'نویسنده', value: authors.length },
    { icon: Layers, label: 'دسته‌بندی', value: categories.length },
    { icon: Award, label: 'سال فعالیت', value: '۵+' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-[#DC2626] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-2xl">ت</span>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-4">درباره تریبون</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
            تریبون یک پایگاه خبری جامع و مستقل است که با هدف ارائه اخبار دقیق، سریع و بی‌طرفانه به مخاطبان فارسی‌زبان فعالیت می‌کند.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <a
              href="https://github.com/MiladJoodi/Tariboon-News"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white text-sm rounded-lg hover:bg-[#1e293b] transition-colors"
            >
              گیت‌هاب پروژه
            </a>
            <a
              href="https://www.linkedin.com/in/joodi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white text-sm rounded-lg hover:bg-[#005e8f] transition-colors"
            >
              لینکدین
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-6 text-center">
              <stat.icon className="w-8 h-8 text-[#DC2626] mx-auto mb-3" />
              <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto mb-16 bg-card border border-border rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#DC2626] rounded-full" />
            ماموریت ما
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ما در تریبون باور داریم که دسترسی به اطلاعات صحیح یک حق اساسی است. تیم ما متشکل از روزنامه‌نگاران باتجربه و متعهد است که هر روز تلاش می‌کنند تا واقعیت‌ها را بدون سوگیری به مردم منتقل کنند.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            تریبون در حوزه‌های سیاسی، اقتصادی، فرهنگی، ورزشی و بین‌الملل فعالیت می‌کند و هر روز اخبار تازه و تحلیل‌های ژرف به مخاطبان ارائه می‌دهد.
          </p>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#DC2626] rounded-full" />
            تیم تحریریه
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-2xl font-bold text-muted-foreground mx-auto mb-3 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                  {author.name[0]}
                </div>
                <h3 className="font-bold text-foreground mb-1">{author.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{author.bio}</p>
                <span className="text-xs text-[#DC2626] mt-2 block">{author.articlesCount} مقاله</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
