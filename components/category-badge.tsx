import Link from 'next/link'
import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  slug: string
  name: string
  size?: 'sm' | 'md'
  className?: string
}

export function CategoryBadge({ slug, name, size = 'sm', className }: CategoryBadgeProps) {
  const cat = categories.find((c) => c.slug === slug)
  const color = cat?.color || '#DC2626'

  return (
    <Link
      href={`/category/${slug}`}
      className={cn(
        'inline-block text-white rounded font-medium hover:opacity-90 transition-opacity',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        className
      )}
      style={{ backgroundColor: color }}
    >
      {name}
    </Link>
  )
}