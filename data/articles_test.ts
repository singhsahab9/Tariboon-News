import { Article } from "@/types"
import { authors } from "./authors"
import { tags } from "./tags"

function getTags(slugs: string[]) {
  return tags.filter((t) => slugs.includes(t.slug))
}

export const articles: Article[] = [
  {
    id: "1",
    title: "مجلس بودجه سال ۱۴۰۵ را با اکثریت آرا تصویب کرد",
    subtitle: "بودجه ۳۵۰۰ هزار میلیارد تومانی با تمرکز بر زیرساخت و آموزش",
    slug: "majles-vote-budget-1404",
    excerpt: "مجلس شورای اسلامی لایحه بودجه سال ۱۴۰۵ را تصویب کرد.",
    content: "<p>مجلس شورای اسلامی لایحه بودجه سال ۱۴۰۵ را با ۱۸۷ رای موافق تصویب کرد. این بودجه بزرگترین بودجه تاریخ ایران محسوب می‌شود.</p>",
    image: "/placeholder.svg",
    category: "سیاسی",
    categorySlug: "politics",
    author: authors[0],
    tags: getTags(["domestic-politics", "parliament", "government"]),
    publishedAt: "2026-02-20T08:00:00Z",
    updatedAt: "2026-02-20T10:00:00Z",
    readingTime: 4,
    views: 18420,
    likes: 342,
    featured: true,
    breaking: false,
    status: "published",
  },
];