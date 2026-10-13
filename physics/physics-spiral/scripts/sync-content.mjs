import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const sourceDir = path.resolve(root, '..', 'feynman-physics-wiki', 'wiki', '讲次');
const targetDir = path.join(root, 'src', 'content', 'lessons');
const files = fs.existsSync(sourceDir) ? fs.readdirSync(sourceDir).filter((file) => file.endsWith('.md')) : [];

if (!files.length) {
  console.error(`No curated lesson files found in ${sourceDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
let exported = 0;

for (const file of files) {
  const source = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  const published = /^published:\s*true\s*$/m.test(source);
  if (!published) continue;
  if (/raw\/|录音|住址|绝对路径|家庭隐私/i.test(source)) {
    console.error(`Refusing to export possible private content: ${file}`);
    process.exit(1);
  }
  const exportedSource = source.replace(/^published:\s*true\s*\n/m, '');
  fs.writeFileSync(path.join(targetDir, file), exportedSource);
  exported += 1;
}

console.log(`Exported ${exported} published lessons to ${targetDir}`);
