import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname, '..');
const lessonsDir = path.join(root, 'src', 'content', 'lessons');
const required = ['id', 'route', 'title', 'pillar', 'stage', 'age_range', 'loop_depth', 'order'];
const allowedPillars = new Set(['motion', 'fields', 'energy', 'micro']);
const files = fs.existsSync(lessonsDir) ? fs.readdirSync(lessonsDir).filter((file) => file.endsWith('.md')) : [];
const errors = [];
const ids = new Set();
const slugs = new Set();

for (const file of files) {
  const content = fs.readFileSync(path.join(lessonsDir, file), 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }
  const frontmatter = Object.fromEntries(match[1].split('\n').filter(Boolean).map((line) => {
    const index = line.indexOf(':');
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')];
  }));
  for (const field of required) if (!frontmatter[field]) errors.push(`${file}: missing ${field}`);
  if (frontmatter.pillar && !allowedPillars.has(frontmatter.pillar)) errors.push(`${file}: invalid pillar ${frontmatter.pillar}`);
  if (frontmatter.id && ids.has(frontmatter.id)) errors.push(`${file}: duplicate id ${frontmatter.id}`);
  if (frontmatter.route && slugs.has(frontmatter.route)) errors.push(`${file}: duplicate route ${frontmatter.route}`);
  if (frontmatter.id) ids.add(frontmatter.id);
  if (frontmatter.route) slugs.add(frontmatter.route);
  if (!content.trim().replace(match[0], '').trim()) errors.push(`${file}: empty lesson body`);
}

if (errors.length) {
  console.error(['Content validation failed:', ...errors.map((error) => `- ${error}`)].join('\n'));
  process.exit(1);
}

console.log(`Content validation passed: ${files.length} lessons`);
