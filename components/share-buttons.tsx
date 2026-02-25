'use client'

import { useState } from 'react'
import { Copy, Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? `${window.location.origin}/post/${slug}` : `/post/${slug}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('لینک کپی شد')
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
  }

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground ml-2">اشتراک‌گذاری:</span>
      <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5 text-xs">
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
        کپی لینک
      </Button>
      <Button variant="outline" size="sm" onClick={shareTelegram} className="text-xs">
        تلگرام
      </Button>
      <Button variant="outline" size="sm" onClick={shareWhatsApp} className="text-xs">
        واتساپ
      </Button>
      <Button variant="outline" size="sm" onClick={shareTwitter} className="text-xs">
        توییتر
      </Button>
    </div>
  )
}