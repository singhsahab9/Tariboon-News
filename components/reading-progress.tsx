'use client'

import { useReadingProgress } from '@/hooks/use-scroll'

export function ReadingProgress() {
  const progress = useReadingProgress()

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-[#DC2626] origin-left transition-all duration-100"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}