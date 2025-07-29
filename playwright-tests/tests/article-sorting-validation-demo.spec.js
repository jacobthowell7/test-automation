// ASSIGNMENT QUESTION 1 - Playwright Test Runner Version
import { test, expect } from '@playwright/test';


test('first 100 articles are sorted by date', async ({ page }) => {
  // Go to Hacker Newsnode 
  await page.goto('https://news.ycombinator.com/newest');
  console.log("Page loaded");

  // Make array to hold timestamps
  const dates = [];

  // while loop based on the goal number of 100 articles
  while (dates.length < 100) {
    const mainTable = page.locator('#hnmain');
    const subTable = mainTable.locator('#bigbox table');
    const subTableRows = subTable.locator('tr');
    const rowCount = await subTableRows.count();

    // Process articles (every 3 rows)
    for (let i = 1; i < (rowCount-2); i += 3) {
      if (dates.length >= 100) break;
      const ageCell = subTableRows.nth(i).locator('.age');
      expect(ageCell).toBeTruthy();
      const titleAttr = await ageCell.getAttribute('title');
      expect(titleAttr).toBeTruthy();

      const lastPart = titleAttr?.split(' ').pop();
      const parsedLastPart = parseInt(lastPart);
      if (Number.isNaN(parsedLastPart)) {
        console.error("Invalid timestamp found:", titleAttr);
        continue;
      }
      dates.push(parsedLastPart);
    }

    if (dates.length < 100) {
      // Click "More" to go to the next page
      const moreLink = page.getByRole('link', { name: 'More', exact: true }); 
      if (await moreLink.count() > 0) {
        await moreLink.click();
        await page.waitForLoadState('networkidle');
      } else {
        console.warn('No "More" link found');
        console.warn('Only ' + dates.length + ' articles found');
        break;
      }
    }
  }

  // Check that dates are sorted in descending order (newest to oldest)
  for (let i = 0; i < dates.length - 1; i++) {
    expect(dates[i]).toBeGreaterThanOrEqual(dates[i + 1]);
  }
  console.log(dates.length + " articles are sorted by newest to oldest correctly"); 
});

