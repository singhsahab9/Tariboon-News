'use client'

import { create } from 'zustand'
import { SortOption } from '@/types'

interface UIStore {
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedCategory: string | null
  setSelectedCategory: (slug: string | null) => void
  selectedTag: string | null
  setSelectedTag: (slug: string | null) => void
  currentPage: number
  setCurrentPage: (n: number) => void
  sortOption: SortOption
  setSortOption: (sort: SortOption) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  selectedCategory: null,
  setSelectedCategory: (slug) => set({ selectedCategory: slug, currentPage: 1 }),
  selectedTag: null,
  setSelectedTag: (slug) => set({ selectedTag: slug, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (n) => set({ currentPage: n }),
  sortOption: 'newest',
  setSortOption: (sort) => set({ sortOption: sort, currentPage: 1 }),
  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}))
