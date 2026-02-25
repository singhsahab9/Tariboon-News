export interface Author {
  id: string
  name: string
  slug: string
  avatar: string
  bio: string
  email: string
  articlesCount: number
  joinedAt: string
  social?: {
    twitter?: string
    instagram?: string
    telegram?: string
  }
}

export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  color: string
  count?: number
}

export interface Article {
  id: string
  title: string
  subtitle?: string
  slug: string
  excerpt: string
  content: string
  image: string
  imageCaption?: string
  category: string
  categorySlug: string
  author: Author
  tags: Tag[]
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  likes: number
  featured: boolean
  breaking: boolean
  status: 'published' | 'draft'
}

export interface Comment {
  id: string
  articleId: string
  articleSlug: string
  authorName: string
  authorEmail: string
  content: string
  createdAt: string
  approved: boolean
}

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}

export interface SearchResult {
  articles: Article[]
  total: number
  query: string
}

export type SortOption = 'newest' | 'oldest' | 'most-viewed' | 'most-liked'
