import { Tag } from '@/types'

export const tags: Tag[] = [
  { id: '1', name: 'سیاست داخلی', slug: 'domestic-politics', count: 87 },
  { id: '2', name: 'انتخابات', slug: 'elections', count: 43 },
  { id: '3', name: 'مجلس', slug: 'parliament', count: 52 },
  { id: '4', name: 'دولت', slug: 'government', count: 61 },
  { id: '5', name: 'اقتصاد', slug: 'economy', count: 74 },
  { id: '6', name: 'بورس', slug: 'stock-market', count: 38 },
  { id: '7', name: 'تورم', slug: 'inflation', count: 29 },
  { id: '8', name: 'مسکن', slug: 'housing', count: 25 },
  { id: '9', name: 'فوتبال', slug: 'football', count: 112 },
  { id: '10', name: 'والیبال', slug: 'volleyball', count: 34 },
  { id: '11', name: 'لیگ برتر', slug: 'premier-league', count: 67 },
  { id: '12', name: 'تیم ملی', slug: 'national-team', count: 48 },
  { id: '13', name: 'هوش مصنوعی', slug: 'artificial-intelligence', count: 56 },
  { id: '14', name: 'استارتاپ', slug: 'startup', count: 31 },
  { id: '15', name: 'فضا', slug: 'space', count: 22 },
  { id: '16', name: 'موبایل', slug: 'mobile', count: 44 },
  { id: '17', name: 'سینما', slug: 'cinema', count: 39 },
  { id: '18', name: 'ادبیات', slug: 'literature', count: 27 },
  { id: '19', name: 'موسیقی', slug: 'music', count: 35 },
  { id: '20', name: 'بین‌الملل', slug: 'international', count: 83 },
  { id: '21', name: 'آمریکا', slug: 'usa', count: 45 },
  { id: '22', name: 'اروپا', slug: 'europe', count: 38 },
  { id: '23', name: 'خاورمیانه', slug: 'middle-east', count: 62 },
  { id: '24', name: 'محیط زیست', slug: 'environment', count: 41 },
  { id: '25', name: 'بهداشت', slug: 'health', count: 53 },
  { id: '26', name: 'آموزش', slug: 'education', count: 46 },
  { id: '27', name: 'حوادث', slug: 'incidents', count: 58 },
]

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug)
}
