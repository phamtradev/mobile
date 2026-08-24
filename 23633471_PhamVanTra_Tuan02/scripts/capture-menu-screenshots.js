const path = require('path');
const { chromium } = require('playwright');

const OUT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');
const URL = 'http://localhost:8081';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });

  await page.goto(URL, { waitUntil: 'load' });
  await page.getByText('Bài tập React Native').waitFor({ timeout: 30000 });
  await page.screenshot({ path: path.join(OUT_DIR, '10-menu.png') });

  await page.getByText('Student Directory').first().click();
  await page.getByText('Danh bạ sinh viên theo khoa', { exact: true }).waitFor({ timeout: 15000 });
  await page.getByText('Tìm thấy 7 sinh viên').waitFor({ timeout: 15000 });
  await page.screenshot({ path: path.join(OUT_DIR, '11-student-directory.png') });

  const search = page.getByPlaceholder('Tìm tên, mã sinh viên hoặc lớp');
  await search.fill('lê thu hà');
  await page.getByText('Tìm thấy 1 sinh viên').waitFor({ timeout: 10000 });
  await page.screenshot({ path: path.join(OUT_DIR, '12-student-search.png') });

  await search.fill('khongtontai999');
  await page.getByText('Không tìm thấy sinh viên').waitFor({ timeout: 10000 });
  await page.screenshot({ path: path.join(OUT_DIR, '13-student-empty.png') });

  await page.goBack();
  await page.getByText('Bài tập React Native').waitFor({ timeout: 15000 });

  await page.getByText('Course Catalog').first().click();
  await page.getByText('Khám phá các khóa học đang mở').waitFor({ timeout: 15000 });
  await page.screenshot({ path: path.join(OUT_DIR, '14-courses-from-menu.png') });

  console.log('done');
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
