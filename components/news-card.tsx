import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, Tag } from 'lucide-react'
import { Article } from '@/types'
import { formatPersianDate, formatViewCount } from '@/utils/format'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  article: Article
  variant?: 'featured' | 'compact' | 'minimal' | 'hero'
  className?: string
}

export function NewsCard({ article, variant = 'featured', className }: NewsCardProps) {
  if (variant === 'hero') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className={cn('group block relative overflow-hidden rounded-lg', className)}
      >
        <div className="relative h-72 md:h-96">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 left-0 p-5">
          <span
            className="inline-block text-white text-xs px-2 py-0.5 rounded mb-2"
            style={{ backgroundColor: '#DC2626' }}
          >
            {article.category}
          </span>
          <h2 className="text-white text-xl md:text-2xl font-bold leading-snug mb-2 group-hover:text-red-200 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{formatPersianDate(article.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViewCount(article.views)}
            </span>
          </div>
        </div>
        {article.breaking && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold animate-pulse">
            فوری
          </div>
        )}
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/post/${article.slug}`}
        className={cn(
          'group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow',
          className
        )}
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.breaking && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">
              فوری
            </div>
          )}
        </div>
        <div className="p-3">
          <span
            className="inline-block text-white text-[10px] px-2 py-0.5 rounded mb-1.5"
            style={{ backgroundColor: '#DC2626' }}
          >
            {article.category}
          </span>
          <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-[#DC2626] transition-colors">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{formatPersianDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViewCount(article.views)}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex gap-3 group', className)}>
        <div className="relative w-20 h-20 shrink-0 rounded overflow-hidden">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={`/post/${article.slug}`}
            className="font-semibold text-sm text-foreground hover:text-[#DC2626] line-clamp-2 leading-snug block mb-1 transition-colors"
          >
            {article.title}
          </Link>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{formatPersianDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.category}</span>
          </div>
        </div>
      </div>
    )
  }

  // minimal
  return (
    <Link
      href={`/post/${article.slug}`}
      className={cn(
        'block text-sm font-medium text-foreground hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug',
        className
      )}
    >
      {article.title}
    </Link>
  )
}