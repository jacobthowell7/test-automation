import { test, expect } from '@playwright/test';

test.describe.configure({
  mode: 'serial',
});

//Describe to wrap successful login tests
test.describe('Proper Auth Tests', () => {
  test.use({
    httpCredentials: {
      username: 'admin',
      password: 'admin',
    },
  });

  test('successful login with correct username and password', async ({ page }) => {
    const responsePromise = page.waitForResponse(response =>
         response.url().includes('/basic_auth') && response.status() === 200);
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    const response = await responsePromise;

    // Expect basic_auth endpoint to return 200
    expect(response.status()).toEqual(200);
    
    // Expect body to have "Congratualtions"
    await expect(page.locator('#content')).toContainText('Congratulations! You must have the proper credentials.');
  });
}); //End of describe block

test('fail to login with incorrect username and password', async ({ page }) => {
  const responsePromise = page.waitForResponse('**/basic_auth');
  await page.goto('https://the-internet.herokuapp.com/basic_auth');
  const response = await responsePromise;

  // Expect basic_auth endpoint to return 401
  expect(response.status()).toEqual(401);

  // Expect body to have "Not authorized"
  await expect(page.textContent('body')).resolves.toContain('Not authorized');
});

test('drag and drop', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  //Verify A is in 'column-a'
  await expect(page.locator('#column-a').locator('header')).toHaveText('A');
  await page.locator('#column-a').dragTo(page.locator('#column-b'));
  
  // Expect B to be in 'column-a'
  await expect(page.locator('#column-a').locator('header')).toHaveText('B');
});

test('select dropdown option', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  await page.locator('#dropdown').selectOption('1');

  // Expect dropdown box to have Option 1
  await expect(page.locator('#dropdown')).toHaveValue('1');
});

test('select dropdown option with keyboard', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  const combobox = page.locator('#dropdown');
  await combobox.focus();
  await page.keyboard.press('ArrowDown'); // Move to first option
  await page.keyboard.press('Enter');
  await expect(combobox).toHaveValue('1');
  await expect(combobox.getByRole('option', { selected: true })).toHaveText('Option 1');

  // Expect dropdown box to have Option 1
  await expect(page.locator('#dropdown')).toHaveValue('1');
});

test('select checkbox option', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  await page.getByRole('checkbox').first().click();

  // Expect Option 1 to be 'checked'
  await expect(page.getByRole('checkbox').first()).toBeChecked();
});

test('hover over image', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  await page.getByRole('img', { name: 'User Avatar' }).nth(0).hover();

  // Expect image info to be visible
  await expect(page.getByRole('heading', { name: 'name: user1' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View profile' }).getAttribute('href')).resolves.toContain('/users/1');
});

test('input number', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/inputs');
  await page.getByRole('spinbutton').fill('1');

  // Expect input box to have '1'
  await expect(page.getByRole('spinbutton')).toHaveValue('1');
});

test('increment number', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/inputs');
  await page.getByRole('spinbutton').focus();
  await page.keyboard.press('ArrowUp'); // Increment the number
  
  // Expect input box to have '1'
  await expect(page.getByRole('spinbutton')).toHaveValue('1');
});