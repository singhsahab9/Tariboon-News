const fs = require("fs");
const out = "I:/Github/newsfarsi/data/articles.ts";

function art(id, title, subtitle, slug, excerpt, content, category, categorySlug, authorIdx, tags, publishedAt, updatedAt, readingTime, views, likes, featured, breaking) {
  const tagsStr = tags.map(t => "'" + t + "'").join(", ");
  return `  {
    id: '${id}',
    title: '${title.replace(/'/g, "'\''").replace(/\/g, '\\').replace(/`/g, '\`')}',
    subtitle: '${subtitle.replace(/'/g, "'\''").replace(/\/g, '\\').replace(/`/g, '\`')}',
    slug: '${slug}',
    excerpt: '${excerpt.replace(/'/g, "'\''").replace(/\/g, '\\').replace(/`/g, '\`')}',
    content: '${content.replace(/'/g, "'\''").replace(/\/g, '\\').replace(/`/g, '\`')}',
    image: '/placeholder.svg',
    category: '${category}',
    categorySlug: '${categorySlug}',
    author: authors[${authorIdx}],
    tags: getTags([${tagsStr}]),
    publishedAt: '${publishedAt}',
    updatedAt: '${updatedAt}',
    readingTime: ${readingTime},
    views: ${views},
    likes: ${likes},
    featured: ${featured},
    breaking: ${breaking},
    status: 'published',
  }`;
}

const articles = [
  art('1','\u0645\u062c\u0644\u0633 \u0628\u0648\u062f\u062c\u0647 \u0633\u0627\u0644 \u06f1\u06f4\u06f0\u06f5 \u0631\u0627 \u0628\u0627 \u0627\u06a9\u062b\u0631\u06cc\u062a \u0622\u0631\u0627 \u062a\u0635\u0648\u06cc\u0628 \u06a9\u0631\u062f','\u0628\u0648\u062f\u062c\u0647 \u06f3\u06f5\u06f0\u06f0 \u0647\u0632\u0627\u0631 \u0645\u06cc\u0644\u06cc\u0627\u0631\u062f \u062a\u0648\u0645\u0627\u0646\u06cc \u0628\u0627 \u062a\u0645\u0631\u06a9\u0632 \u0628\u0631 \u0632\u06cc\u0631\u0633\u0627\u062e\u062a \u0648 \u0622\u0645\u0648\u0632\u0634','majles-vote-budget-1404','\u0645\u062c\u0644\u0633 \u0634\u0648\u0631\u0627\u06cc \u0627\u0633\u0644\u0627\u0645\u06cc \u067e\u0633 \u0627\u0632 \u06f4\u06f8 \u0633\u0627\u0639\u062a \u0628\u062d\u062b \u0648 \u0628\u0631\u0631\u0633\u06cc\u060c \u0644\u0627\u06cc\u062d\u0647 \u0628\u0648\u062f\u062c\u0647 \u0633\u0627\u0644 \u06f1\u06f4\u06f0\u06f5 \u0631\u0627 \u0628\u0627 \u06f1\u06f8\u06f7 \u0631\u0627\u06cc \u0645\u0648\u0627\u0641\u0642\u060c \u06f5\u06f4 \u0631\u0627\u06cc \u0645\u062e\u0627\u0644\u0641 \u0648 \u06f1\u06f2 \u0631\u0627\u06cc \u0645\u0645\u062a\u0646\u0639 \u062a\u0635\u0648\u06cc\u0628 \u06a9\u0631\u062f.','<p>\u0645\u062c\u0644\u0633 \u0634\u0648\u0631\u0627\u06cc \u0627\u0633\u0644\u0627\u0645\u06cc \u062f\u0631 \u062c\u0644\u0633\u0647 \u0639\u0644\u0646\u06cc \u062f\u06cc\u0631\u0648\u0632\u060c \u0644\u0627\u06cc\u062d\u0647 \u0628\u0648\u062f\u062c\u0647 \u0633\u0627\u0644 \u06f1\u06f4\u06f0\u06f5 \u06a9\u0644 \u06a9\u0634\u0648\u0631 \u0631\u0627 \u0628\u0627 \u06f1\u06f8\u06f7 \u0631\u0627\u06cc \u0645\u0648\u0627\u0641\u0642 \u0628\u0647 \u062a\u0635\u0648\u06cc\u0628 \u0631\u0633\u0627\u0646\u062f. \u0627\u06cc\u0646 \u0628\u0648\u062f\u062c\u0647 \u0628\u0627 \u0631\u0642\u0645 \u06a9\u0644 \u06f3\u06f5\u06f0\u06f0 \u0647\u0632\u0627\u0631 \u0645\u06cc\u0644\u06cc\u0627\u0631\u062f \u062a\u0648\u0645\u0627\u0646\u060c \u0628\u0632\u0631\u06af\u200c\u062a\u0631\u06cc\u0646 \u0628\u0648\u062f\u062c\u0647 \u062a\u0627\u0631\u06cc\u062e \u0627\u06cc\u0631\u0627\u0646 \u0645\u062d\u0633\u0648\u0628 \u0645\u06cc\u200c\u0634\u0648\u062f.</p>','\u0633\u06cc\u0627\u0633\u06cc','politics',0,['domestic-politics','parliament','government'],'2026-02-20T08:00:00Z','2026-02-20T10:00:00Z',4,18420,342,true,false),
];

console.log('Count:', articles.length);
