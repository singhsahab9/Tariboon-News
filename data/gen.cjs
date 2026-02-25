const fs = require("fs");
const path = "I:/Github/newsfarsi/data/articles.ts";

const lines = [];

lines.push("import { Article } from '@/types'");
lines.push("import { authors } from './authors'");
lines.push("import { tags } from './tags'");
lines.push("");
lines.push("function getTags(slugs: string[]) {");
lines.push("  return tags.filter((t) => slugs.includes(t.slug))");
lines.push("}");
lines.push("");
lines.push("export const articles: Article[] = [");

function art(obj) {
  const tagsStr = obj.tags.map(t => `'${t}'`).join(', ');
  lines.push("  {");
  lines.push(`    id: '${obj.id}',`);
  lines.push(`    title: '${obj.title}',`);
  lines.push(`    subtitle: '${obj.subtitle}',`);
  lines.push(`    slug: '${obj.slug}',`);
  lines.push(`    excerpt: '${obj.excerpt}',`);
  lines.push(`    content: '${obj.content}',`);
  lines.push(`    image: '/placeholder.svg',`);
  lines.push(`    category: '${obj.category}',`);
  lines.push(`    categorySlug: '${obj.categorySlug}',`);
  lines.push(`    author: authors[${obj.authorIdx}],`);
  lines.push(`    tags: getTags([${tagsStr}]),`);
  lines.push(`    publishedAt: '${obj.publishedAt}',`);
  lines.push(`    updatedAt: '${obj.updatedAt}',`);
  lines.push(`    readingTime: ${obj.readingTime},`);
  lines.push(`    views: ${obj.views},`);
  lines.push(`    likes: ${obj.likes},`);
  lines.push(`    featured: ${obj.featured},`);
  lines.push(`    breaking: ${obj.breaking},`);
  lines.push(`    status: 'published',`);
  lines.push("  },");
}

art({id:"1",title:"\u0645\u062c\u0644\u0633 \u0628\u0648\u062f\u062c\u0647 \u0633\u0627\u0644 \u06f1\u06f4\u06f0\u06f5 \u0631\u0627 \u0628\u0627 \u0627\u06a9\u062b\u0631\u06cc\u062a \u0622\u0631\u0627 \u062a\u0635\u0648\u06cc\u0628 \u06a9\u0631\u062f",subtitle:"\u0628\u0648\u062f\u062c\u0647 \u06f3\u06f5\u06f0\u06f0 \u0647\u0632\u0627\u0631 \u0645\u06cc\u0644\u06cc\u0627\u0631\u062f \u062a\u0648\u0645\u0627\u0646\u06cc \u0628\u0627 \u062a\u0645\u0631\u06a9\u0632 \u0628\u0631 \u0632\u06cc\u0631\u0633\u0627\u062e\u062a \u0648 \u0622\u0645\u0648\u0632\u0634",slug:"majles-vote-budget-1404",excerpt:"\u0645\u062c\u0644\u0633 \u0634\u0648\u0631\u0627\u06cc \u0627\u0633\u0644\u0627\u0645\u06cc \u067e\u0633 \u0627\u0632 \u06f4\u06f8 \u0633\u0627\u0639\u062a \u0628\u062d\u062b \u0648 \u0628\u0631\u0631\u0633\u06cc\u060c \u0644\u0627\u06cc\u062d\u0647 \u0628\u0648\u062f\u062c\u0647 \u0633\u0627\u0644 \u06f1\u06f4\u06f0\u06f5 \u0631\u0627 \u0628\u0627 \u06f1\u06f8\u06f7 \u0631\u0627\u06cc \u0645\u0648\u0627\u0641\u0642\u060c \u06f5\u06f4 \u0631\u0627\u06cc \u0645\u062e\u0627\u0644\u0641 \u0648 \u06f1\u06f2 \u0631\u0627\u06cc \u0645\u0645\u062a\u0646\u0639 \u062a\u0635\u0648\u06cc\u0628 \u06a9\u0631\u062f.",content:"\u0645\u062c\u0644\u0633 test",category:"\u0633\u06cc\u0627\u0633\u06cc",categorySlug:"politics",authorIdx:0,tags:["domestic-politics","parliament","government"],publishedAt:"2026-02-20T08:00:00Z",updatedAt:"2026-02-20T10:00:00Z",readingTime:4,views:18420,likes:342,featured:true,breaking:false});

lines.push("];");
lines.push("");

fs.writeFileSync(path, lines.join("\n"), "utf8");
console.log("Written", lines.length, "lines");