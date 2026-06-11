import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitBtn: Locator;
  readonly bookingWidget: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /Contact/i });
    this.form = page.locator('form').filter({ hasText: /Contact|Message|Submit/i }).first();
    this.nameInput = this.form.getByRole('textbox', { name: /name/i }).or(this.form.locator('input[name*="name" i]'));
    this.emailInput = this.form.getByRole('textbox', { name: /email/i }).or(this.form.locator('input[type="email" i]'));
    this.submitBtn = this.form.getByRole('button', { name: /submit|send/i }).or(this.form.locator('input[type="submit" i]'));
    this.bookingWidget = page.locator('#booking-app, iframe[src*="calendly"], iframe[src*="meetings"], .booking-widget').first();
  }

  async goto() {
    await this.page.goto('https://testifysolutions.net/contact-us/', { waitUntil: 'domcontentloaded' });
  }

  async gotoBooking() {
    await this.page.goto('https://testifysolutions.net/contact-us/#booking-app', { waitUntil: 'domcontentloaded' });
  }
}
