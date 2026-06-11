import { test, expect } from '@playwright/test';
import { testifyCase } from './helpers/testify-case';
import { ContactPage } from './pages/ContactPage';

const CONTACT_URL = 'https://testifysolutions.net/contact-us/';

test.describe('Testify Solutions Contact Page Regression', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test(
    'TL-029: Contact Page Load and Display',
    { tag: ['@testify', '@contact', '@TL-029'] },
    async ({ page }) => {
      testifyCase('TL-029', 'Contact Page Load and Display');

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/Failed to load resource.*403/i.test(msg.text())) {
          consoleErrors.push(msg.text());
        }
      });

      await expect(page).toHaveTitle(/Contact/i);
      await expect(contactPage.heading.first()).toBeVisible();
      expect(consoleErrors, 'no console errors on contact page').toEqual([]);
    },
  );

  test(
    'TL-030: Contact Form Field Display',
    { tag: ['@testify', '@contact', '@TL-030'] },
    async () => {
      testifyCase('TL-030', 'Contact Form Field Display');
      
      await expect(contactPage.form).toBeVisible({ timeout: 15000 });
      await expect(contactPage.nameInput.first()).toBeVisible();
      await expect(contactPage.emailInput.first()).toBeVisible();
      await expect(contactPage.submitBtn.first()).toBeVisible();
      await expect(contactPage.submitBtn.first()).toBeEnabled();
    },
  );

  test(
    'TL-032: Contact Form Required Field Validation',
    { tag: ['@testify', '@contact', '@TL-032'] },
    async ({ page }) => {
      testifyCase('TL-032', 'Contact Form Required Field Validation');
      
      await contactPage.submitBtn.first().click();

      await expect(page).toHaveURL(CONTACT_URL);
      
      const hasErrorText = await contactPage.form.locator('text=/required|invalid|please|error/i').count();
      const html5Validation = await page.evaluate(() => {
        const invalidInputs = document.querySelectorAll(':invalid');
        return invalidInputs.length > 0;
      });

      expect(hasErrorText > 0 || html5Validation).toBeTruthy();
    },
  );

  test(
    'TL-050: Booking Widget Display and Load',
    { tag: ['@testify', '@contact', '@TL-050'] },
    async () => {
      testifyCase('TL-050', 'Booking Widget Display and Load');
      await contactPage.gotoBooking();
      await expect(contactPage.bookingWidget).toBeVisible({ timeout: 15000 });
    },
  );
});
