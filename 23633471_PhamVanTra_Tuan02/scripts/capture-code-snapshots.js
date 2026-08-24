const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'screenshots');
const HTML_PATH = path.join(__dirname, 'code-snapshot.html');

const FILES = [
  {
    file: 'src/app/index.tsx',
    badge: 'Menu: entry point (thay App.tsx)',
    out: '04-code-entry-index.png',
  },
  {
    file: 'src/components/courses/course-list-screen.tsx',
    badge: '#1 #2 #3 #7 #8 #9 #10',
    out: '05-code-course-list-screen.png',
  },
  {
    file: 'src/components/courses/course-row.tsx',
    badge: '#4 CourseRow',
    out: '06-code-course-row.png',
  },
  {
    file: 'src/components/courses/search-field.tsx',
    badge: '#5 TextInput tim kiem',
    out: '07-code-search-field.png',
  },
  {
    file: 'src/utils/filter-courses.ts',
    badge: '#6 Loc theo tu khoa',
    out: '08-code-filter-courses.png',
  },
  {
    file: 'src/components/courses/course-list-header.tsx',
    badge: '#7 ListHeaderComponent',
    out: '09-code-course-list-header.png',
  },
  {
    file: 'src/components/students/student-directory-screen.tsx',
    badge: '#1 #2 #3 #5 #8 #9 #10 #11 #12',
    out: '15-code-student-directory-screen.png',
  },
  {
    file: 'src/components/students/student-row.tsx',
    badge: '#4 StudentRow',
    out: '16-code-student-row.png',
  },
  {
    file: 'src/utils/get-initials.ts',
    badge: '#4 getInitials',
    out: '17-code-get-initials.png',
  },
  {
    file: 'src/components/students/search-field.tsx',
    badge: '#6 TextInput tim kiem',
    out: '18-code-search-field-students.png',
  },
  {
    file: 'src/utils/filter-student-sections.ts',
    badge: '#7 #8 Loc + an section rong',
    out: '19-code-filter-student-sections.png',
  },
  {
    file: 'src/components/students/section-header.tsx',
    badge: '#3 renderSectionHeader',
    out: '20-code-section-header.png',
  },
  {
    file: 'src/components/students/student-list-header.tsx',
    badge: '#6 #9 ListHeaderComponent',
    out: '21-code-student-list-header.png',
  },
  {
    file: 'src/components/students/empty-state.tsx',
    badge: '#10 ListEmptyComponent',
    out: '22-code-empty-state-students.png',
  },
  {
    file: 'src/app/courses.tsx',
    badge: 'Route /courses',
    out: '23-code-route-courses.png',
  },
  {
    file: 'src/app/students.tsx',
    badge: 'Route /students',
    out: '24-code-route-students.png',
  },
];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });
  await page.goto('file://' + HTML_PATH.replace(/\\/g, '/'));

  for (const entry of FILES) {
    const code = fs.readFileSync(path.join(ROOT, entry.file), 'utf8');
    const handle = await page.evaluateHandle(
      ({ file, badge, code }) => window.renderWindow({ file, badge, code }),
      { file: entry.file, badge: entry.badge, code },
    );
    const el = handle.asElement();
    await el.screenshot({ path: path.join(OUT_DIR, entry.out) });
    console.log('saved', entry.out);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
