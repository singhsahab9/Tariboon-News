const fs = require('fs');
const p = 'I:/Github/newsfarsi/data/articles.ts';
const L = [];
const push = s => L.push(s);

push('export const articles = [];');

fs.writeFileSync(p, L.join('\n'), 'utf8');
console.log('Done');