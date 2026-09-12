import { chromium } from 'playwright';

const errors = [];
const url = 'http://localhost:5173';

const browser = await chromium.launch();

async function run(viewport, label) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[${label}] console: ${msg.text()}`);
  });
  page.on('pageerror', (err) => errors.push(`[${label}] pageerror: ${err.message}`));

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('text=DIVYANSHU SHARMA', { timeout: 15000 });
  await page.screenshot({ path: `scratchpad-shots/${label}-hero.png`, fullPage: false });

  // nav link scroll
  await page.locator('a[href="#projects"]:visible').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `scratchpad-shots/${label}-projects-scroll.png` });

  // project modal
  const viewDetails = page.locator('text=View Details').first();
  await viewDetails.click();
  await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
  await page.screenshot({ path: `scratchpad-shots/${label}-modal.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const dialogGone = await page.locator('[role="dialog"]').count();

  // Resume sections
  await page.locator('#education').scrollIntoViewIfNeeded();
  await page.waitForSelector('text=Master of Computer Applications');
  await page.locator('#research').scrollIntoViewIfNeeded();
  await page.waitForSelector('text=Hybrid NLP and Machine Learning Approach');

  // mobile hamburger (only for mobile viewport)
  if (label === 'mobile') {
    await page.click('button[aria-label*="navigation menu"]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: `scratchpad-shots/${label}-menu-open.png` });
  }

  console.log(`${label}: dialog present after Escape = ${dialogGone}`);
  await context.close();
}

import { mkdirSync } from 'fs';
mkdirSync('scratchpad-shots', { recursive: true });

await run({ width: 1440, height: 900 }, 'desktop');
await run({ width: 375, height: 812 }, 'mobile');

await browser.close();

console.log('--- ERRORS ---');
if (errors.length === 0) console.log('none');
else errors.forEach((e) => console.log(e));
