import { test, expect } from '@playwright/test';

test.describe('Initial Regression Suite for Artashes Kocharyan Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/');
  });

  test('Recruiter/Hiring Manager Review', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#portfolio');
    await page.goto('https://artasheskocharyan.com/#resume');
    await page.goto('https://artasheskocharyan.com/#contact');
    await expect(page).toHaveURL('https://artasheskocharyan.com/#contact');
  });

  test('Project Deep Dive', async ({ page }) => {
    await page.goto('https://artasheskocharyan.com/#portfolio');
    await page
      .getByRole('link', {
        name: "Twitter logo on a blue background, featuring white text spelling out 'Twitter' followed by the white bird.",
      })
      .click();
    await expect(page).toHaveURL('https://github.com/JustAnotherDevFromLA');
  });

  test('External Professional Profile Verification', async ({ page }) => {
    await page.goto('https://www.linkedin.com/in/artashes-kocharyan/');
    await expect(page.url()).toContain('linkedin.com');
    await page.goBack();
    await page.goto('https://github.com/JustAnotherDevFromLA');
    await expect(page).toHaveURL('https://github.com/JustAnotherDevFromLA');
  });
});
