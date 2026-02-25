var fs = require("fs");
var L = [];
function w(s) { L.push(s == null ? "" : String(s)); }
function a(id,ti,su,sl,ex,co,cat,cs,ai,tg,pub,upd,rt,vi,li,fe,br) {
  var ts = tg.map(function(t){return "'" + t + "'"}).join(", ");
  w("  {"); w("    id: '" + id + "',");
  w("    title: '" + ti + "',");
  w("    subtitle: '" + su + "',");
  w("    slug: '" + sl + "',");
  w("    excerpt: '" + ex + "',");
  w("    content: '" + co + "',");
  w("    image: '/placeholder.svg',");
  w("    category: '" + cat + "',");
  w("    categorySlug: '" + cs + "',");
  w("    author: authors[" + ai + "],");
  w("    tags: getTags([" + ts + "]),");
  w("    publishedAt: '" + pub + "',");
  w("    updatedAt: '" + upd + "',");
  w("    readingTime: " + rt + ","); w("    views: " + vi + ",");
  w("    likes: " + li + ","); w("    featured: " + fe + ",");
  w("    breaking: " + br + ",");
  w("    status: 'published',"); w("  },");
}
w("import { Article } from '@/types'");
w("import { authors } from './authors'");
w("import { tags } from './tags'");
w("");
w("function getTags(slugs: string[]) {");
w("  return tags.filter((t) => slugs.includes(t.slug))");
w("}");
w("");
w("export const articles: Article[] = [");
