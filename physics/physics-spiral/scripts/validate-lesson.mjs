import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(new URL('.', import.meta.url).pathname, '..');
const defaultFile = path.resolve(projectRoot, '..', 'feynman-physics-wiki', 'wiki', '讲次', 'l02.md');
const file = path.resolve(process.cwd(), process.argv[2] ?? defaultFile);
const content = fs.readFileSync(file, 'utf8');
const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const errors = [];

if (!match) {
  console.error(`Lesson validation failed: missing frontmatter in ${file}`);
  process.exit(1);
}

const frontmatterText = match[1];
const body = match[2];
const fields = Object.fromEntries(frontmatterText.split('\n').filter((line) => line && !/^\s/.test(line)).map((line) => {
  const separator = line.indexOf(':');
  return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
}));
const requiredFields = ['id', 'route', 'title', 'pillar', 'stage', 'age_range', 'loop_depth', 'order', 'published', 'summary', 'core_question', 'next_lesson_id', 'resources'];
for (const field of requiredFields) if (!Object.hasOwn(fields, field) || (field !== 'resources' && fields[field] === '')) errors.push(`missing frontmatter field: ${field}`);
if (fields.published !== 'true') errors.push('published must be true for an exported lesson');
if (fields.pillar && !['motion', 'fields', 'energy', 'micro'].includes(fields.pillar)) errors.push(`unsupported pillar: ${fields.pillar}`);
if (/^\s+type:/m.test(frontmatterText)) errors.push('legacy resource field `type` found; use `slot` and `kind`');
if (/phet_link:|physicshub_link:|audio_duration:/m.test(frontmatterText)) errors.push('legacy resource field found; use the unified resources list');

const requiredSections = ['先想一想', '看视频', '去实验场玩一玩', '动手做一做', '今天的收获', '下一讲预告'];
const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((item) => item[1].trim());
let previousIndex = -1;
for (const section of requiredSections) {
  const index = headings.indexOf(section);
  if (index === -1) errors.push(`missing body section: ${section}`);
  if (index !== -1 && index <= previousIndex) errors.push(`body sections out of order near: ${section}`);
  if (index !== -1) previousIndex = index;
}
if (fields.core_question && !body.includes(fields.core_question)) errors.push('core_question is not reflected in the body');
if (fields.title && !body.includes(fields.title)) errors.push('frontmatter title is not reflected in the body title');

const resourceLines = frontmatterText.split('\n').filter((line) => /^\s+-\s+(slot|kind):/.test(line));
const slots = frontmatterText.match(/^\s+-\s+slot:\s*(.+)$/gm) ?? [];
const kinds = frontmatterText.match(/^\s+kind:\s*(.+)$/gm) ?? [];
const allowedSlots = ['visual-primer', 'sandbox', 'reading', 'hook'];
const allowedKinds = ['video', 'simulator', 'book', 'audio'];
for (const line of slots) if (!allowedSlots.includes(line.split(':').slice(1).join(':').trim())) errors.push(`unsupported resource slot: ${line}`);
for (const line of kinds) if (!allowedKinds.includes(line.split(':').slice(1).join(':').trim())) errors.push(`unsupported resource kind: ${line}`);
if (slots.length !== kinds.length) errors.push('every resource must declare exactly one slot and one kind');
if (resourceLines.length === 0) errors.push('resources must contain at least one classified item');

if (errors.length) {
  console.error(['Lesson validation failed:', ...errors.map((error) => `- ${error}`)].join('\n'));
  process.exit(1);
}

console.log(`Lesson validation passed: ${path.relative(process.cwd(), file)}`);
