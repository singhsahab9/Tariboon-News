import Link from "next/link"
import { categories } from "@/lib/data"
import { ChevronLeft } from "lucide-react"

export function CategorySidebar() {
  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="bg-primary text-primary-foreground p-3">
        <h3 className="font-bold text-sm">دسته‌بندی اخبار</h3>
      </div>
      <ul className="divide-y divide-border">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between p-2.5 text-xs hover:bg-accent transition-colors group"
            >
              <span className="text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
              <ChevronLeft className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
