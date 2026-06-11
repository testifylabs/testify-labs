import { test, expect } from '@playwright/test';
import { testifyCase } from './helpers/testify-case';

const CONTACT_URL = 'https://testifysolutions.net/contact-us/';

test.describe('Testify Solutions Contact Page Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CONTACT_URL);
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
      
      const heading = page.getByRole('heading', { name: /Contact/i });
      await expect(heading.first()).toBeVisible();

      // Ensure no major console errors during load
      expect(consoleErrors, 'no console errors on contact page').toEqual([]);
    },
  );

  test(
    'TL-030: Contact Form Field Display',
    { tag: ['@testify', '@contact', '@TL-030'] },
    async ({ page }) => {
      testifyCase('TL-030', 'Contact Form Field Display');

      // Common form selectors (adjust based on actual form plugin used by Testify)
      const form = page.locator('form').filter({ hasText: /Contact|Message|Submit/i }).first();
      await expect(form).toBeVisible();

      // Looking for typical input fields
      const nameInput = form.getByRole('textbox', { name: /name/i }).or(form.locator('input[name*="name" i]'));
      const emailInput = form.getByRole('textbox', { name: /email/i }).or(form.locator('input[type="email" i]'));
      const submitButton = form.getByRole('button', { name: /submit|send/i }).or(form.locator('input[type="submit" i]'));

      await expect(nameInput.first()).toBeVisible();
      await expect(emailInput.first()).toBeVisible();
      await expect(submitButton.first()).toBeVisible();
      await expect(submitButton.first()).toBeEnabled();
    },
  );

  test(
    'TL-032: Contact Form Required Field Validation',
    { tag: ['@testify', '@contact', '@TL-032'] },
    async ({ page }) => {
      testifyCase('TL-032', 'Contact Form Required Field Validation');
      
      const form = page.locator('form').filter({ hasText: /Contact|Message|Submit/i }).first();
      const submitButton = form.getByRole('button', { name: /submit|send/i }).or(form.locator('input[type="submit" i]'));
      
      await submitButton.first().click();

      // Note: Because this is a live production test, we specifically DO NOT fill out valid data 
      // to avoid spamming the inbox. We expect validation messages or the form to refuse submission.
      
      // Look for standard HTML5 validation or custom error classes
      // This is a generic check to ensure *some* validation UI appears or the page doesn't navigate
      await expect(page).toHaveURL(CONTACT_URL);
      
      // Check for common error text
      const hasErrorText = await form.locator('text=/required|invalid|please|error/i').count();
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
    async ({ page }) => {
      testifyCase('TL-050', 'Booking Widget Display and Load');

      // Go specifically to the booking hash
      await page.goto(`${CONTACT_URL}#booking-app`);

      // Look for typical booking widgets like Calendly, HubSpot, or custom
      const bookingWidget = page.locator('#booking-app, iframe[src*="calendly"], iframe[src*="meetings"], .booking-widget').first();
      
      // Wait for it to become visible, giving it extra time as iframes can be slow
      await expect(bookingWidget).toBeVisible({ timeout: 15000 });
    },
  );
});
