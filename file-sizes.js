import fs from 'fs';
const files = fs.readdirSync('public');
for (const file of files) {
  if (file !== '.keep') {
    const stats = fs.statSync(`public/${file}`);
    const kb = Math.round(stats.size/1024);
    if (kb > 0 || stats.size > 0) {
      console.log(`${file}: ${kb} KB (${stats.size} bytes)`);
    } else {
      console.log(`${file}: EMPTY`);
    }
  }
}
