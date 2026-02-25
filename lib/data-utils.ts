import { Article, PaginatedResult, PaginationMeta, SortOption } from '@/types'
import { articles } from '@/data/articles'
import { authors } from '@/data/authors'
import { tags } from '@/data/tags'
import { categories } from '@/data/categories'

export function paginateArray<T>(arr: T[], page: number, pageSize: number): PaginatedResult<T> {
  const total = arr.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return {
    data: arr.slice(start, end),
    meta: { page, pageSize, total, totalPages },
  }
}

export function sortArticles(arr: Article[], sort: SortOption): Article[] {
  const sorted = [...arr]
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
    case 'most-viewed':
      return sorted.sort((a, b) => b.views - a.views)
    case 'most-liked':
      return sorted.sort((a, b) => b.likes - a.likes)
    default:
      return sorted
  }
}

export function searchArticles(
  query: string,
  page = 1,
  pageSize = 12,
  categorySlug?: string,
  sort: SortOption = 'newest'
): PaginatedResult<Article> {
  const q = query.toLowerCase().trim()
  let results = articles.filter((a) => {
    if (a.status !== 'published') return false
    if (categorySlug && a.categorySlug !== categorySlug) return false
    if (!q) return true
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q) ||
      a.tags.some((t) => t.name.toLowerCase().includes(q))
    )
  })
  results = sortArticles(results, sort)
  return paginateArray(results, page, pageSize)
}

export function getArticlesByCategory(
  categorySlug: string,
  page = 1,
  pageSize = 12,
  sort: SortOption = 'newest'
): PaginatedResult<Article> {
  let results = articles.filter((a) => a.categorySlug === categorySlug && a.status === 'published')
  results = sortArticles(results, sort)
  return paginateArray(results, page, pageSize)
}

export function getArticlesByTag(
  tagSlug: string,
  page = 1,
  pageSize = 12,
  sort: SortOption = 'newest'
): PaginatedResult<Article> {
  let results = articles.filter(
    (a) => a.tags.some((t) => t.slug === tagSlug) && a.status === 'published'
  )
  results = sortArticles(results, sort)
  return paginateArray(results, page, pageSize)
}

export function getArticlesByAuthor(
  authorSlug: string,
  page = 1,
  pageSize = 12,
  sort: SortOption = 'newest'
): PaginatedResult<Article> {
  let results = articles.filter(
    (a) => a.author.slug === authorSlug && a.status === 'published'
  )
  results = sortArticles(results, sort)
  return paginateArray(results, page, pageSize)
}

export function getAllArticlesPaginated(
  page = 1,
  pageSize = 12,
  sort: SortOption = 'newest',
  categorySlug?: string
): PaginatedResult<Article> {
  let results = articles.filter((a) => {
    if (a.status !== 'published') return false
    if (categorySlug && a.categorySlug !== categorySlug) return false
    return true
  })
  results = sortArticles(results, sort)
  return paginateArray(results, page, pageSize)
}

export { articles, authors, tags, categories }
