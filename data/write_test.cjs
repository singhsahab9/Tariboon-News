var fs=require("fs");
var L=[];
function w(s){L.push(s==null?"":String(s));}
function a(id,ti,su,sl,ex,co,cat,cs,ai,tg,pub,upd,rt,vi,li,fe,br){
  var ts=tg.map(function(t){return String.fromCharCode(34)+t+String.fromCharCode(34)}).join(", ");
  var q=String.fromCharCode(34);
  w("  {");
  w("    id: "+JSON.stringify(id)+",");
  w("    title: "+JSON.stringify(ti)+",");
  w("    subtitle: "+JSON.stringify(su)+",");
  w("    slug: "+JSON.stringify(sl)+",");
  w("    excerpt: "+JSON.stringify(ex)+",");
  w("    content: "+JSON.stringify(co)+",");
  w("    image: "+q+"/placeholder.svg"+q+",");
  w("    category: "+JSON.stringify(cat)+",");
  w("    categorySlug: "+JSON.stringify(cs)+",");
  w("    author: authors["+ai+"],");
  w("    tags: getTags(["+ts+"]),");
  w("    publishedAt: "+JSON.stringify(pub)+",");
  w("    updatedAt: "+JSON.stringify(upd)+",");
  w("    readingTime: "+rt+",");
  w("    views: "+vi+",");
  w("    likes: "+li+",");
  w("    featured: "+fe+",");
  w("    breaking: "+br+",");
  w("    status: "+q+"published"+q+",");
  w("  },");
}

var q=String.fromCharCode(34);
w("import { Article } from "+q+"@/types"+q);
w("import { authors } from "+q+"./authors"+q);
w("import { tags } from "+q+"./tags"+q);
w("");
w("function getTags(slugs: string[]) {");
w("  return tags.filter((t) => slugs.includes(t.slug))");
w("}");
w("");
w("export const articles: Article[] = [");
a("1","مجلس بودجه سال ۱۴۰۵ را با اکثریت آرا تصویب کرد","بودجه ۳۵۰۰ هزار میلیارد تومانی با تمرکز بر زیرساخت و آموزش","majles-vote-budget-1404","مجلس شورای اسلامی لایحه بودجه سال ۱۴۰۵ را تصویب کرد.","<p>مجلس شورای اسلامی لایحه بودجه سال ۱۴۰۵ را با ۱۸۷ رای موافق تصویب کرد. این بودجه بزرگترین بودجه تاریخ ایران محسوب می‌شود.</p>","سیاسی","politics",0,["domestic-politics","parliament","government"],"2026-02-20T08:00:00Z","2026-02-20T10:00:00Z",4,18420,342,true,false);
w("];");
fs.writeFileSync("I:/Github/newsfarsi/data/articles_test.ts",L.join(String.fromCharCode(10)),"utf8");
console.log("written",L.length,"lines");
