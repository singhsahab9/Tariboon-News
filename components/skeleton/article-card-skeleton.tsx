import { cn } from '@/lib/utils'

export function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-card border border-border rounded-lg overflow-hidden animate-pulse', className)}>
      <div className="h-44 bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 w-2/3 bg-muted rounded" />
      </div>
    </div>
  )
}

export function ArticleCompactSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-3 animate-pulse', className)}>
      <div className="w-20 h-20 bg-muted rounded shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 w-4/5 bg-muted rounded" />
        <div className="h-2.5 w-1/2 bg-muted rounded mt-2" />
      </div>
    </div>
  )
}

export function ArticleHeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg overflow-hidden animate-pulse', className)}>
      <div className="h-96 bg-muted" />
    </div>
  )
}