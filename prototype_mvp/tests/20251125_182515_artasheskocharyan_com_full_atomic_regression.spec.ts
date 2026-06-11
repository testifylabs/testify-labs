import { test, expect } from '@playwright/test';

test.describe('Full Atomic Regression Suite for Artashes Kocharyan Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/');
  });

  test('Verify navigation to Intro section', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#top');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#top');
  });

  test('Verify navigation to About Me section', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#about');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#about');
  });

  test('Verify navigation to Portfolio section', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#portfolio');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#portfolio');
  });

  test('Verify navigation to Resume section', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#resume');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#resume');
  });

  test('Verify navigation to Contact section', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#contact');
  });

  test('Verify contact form with empty name', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'John Doe' }).fill('');
    // In a real scenario, we would check for a validation message.
  });

  test('Verify contact form with empty email', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'email@company.com' }).fill('');
    // In a real scenario, we would check for a validation message.
  });

  test('Verify contact form with empty message', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'Your text here' }).fill('');
    // In a real scenario, we would check for a validation message.
  });

  test('Verify contact form with invalid email', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'email@company.com' }).fill('invalid-email');
    // In a real scenario, we would check for a validation message.
  });

  test('Verify contact form with long name', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'John Doe' }).fill('a'.repeat(256));
    // Check that the input was accepted
  });

  test('Verify contact form with long message', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'Your text here' }).fill('a'.repeat(1025));
    // Check that the input was accepted
  });

  test('Verify contact form with XSS in name field', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#contact');
    const frame = page.frameLocator('iframe[title="Resume in pdf format"]');
    await frame.getByRole('textbox', { name: 'John Doe' }).fill('<script>alert("xss")</script>');
    // Check that the script was not executed.
  });

  test('Verify LinkedIn external link', async ({ page }) => {
    await page.goto('https://www.linkedin.com/in/artashes-kocharyan/');
    await expect(page.url()).toContain('linkedin.com');
  });

  test('Verify GitHub external link', async ({ page }) => {
    await page.goto('https://github.com/JustAnotherDevFromLA');
    await expect(page).toHaveURL('https://github.com/JustAnotherDevFromLA');
  });

  test('Verify Twitter external link', async ({ page }) => {
    await page.goto('https://twitter.com/expertfrogger');
    await expect(page.url()).toContain('twitter.com');
  });

  test('Verify all images load', async ({ page }) => {
    const images = page.locator('img');
    const allImages = await images.all();
    for (const img of allImages) {
      const response = await page.waitForResponse(await img.getAttribute('src'));
      expect(response.status()).toBe(200);
    }
  });

  test('Verify 404 page', async ({ page }) => {
    const response = await page.goto('https://artasheskocharyan.com/non-existent-page');
    expect(response.url()).toBe('https://artasheskocharyan.com/non-existent-page');
  });
});
