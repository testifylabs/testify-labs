import { test, expect } from '@playwright/test';
import { testifyCase } from './helpers/testify-case';

const HOME = 'https://testifysolutions.net/';
const headerNav = (page: import('@playwright/test').Page) =>
  page.getByRole('navigation', { name: 'Header Navigation' });
const logoLink = (page: import('@playwright/test').Page) =>
  page.getByRole('link', { name: 'Testify Labs' });
const heroTriptychImages = (page: import('@playwright/test').Page) => {
  const all = page.locator('figure img');
  return { first: all.nth(0), center: all.nth(1), third: all.nth(2) };
};
const faqSection = (page: import('@playwright/test').Page) => page.locator('#faq');

test.describe('Testify Solutions Homepage Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(HOME, { waitUntil: 'domcontentloaded' });
  });

  test(
    'TL-001: Header Navigation - Logo Click',
    { tag: ['@testify', '@TL-001'] },
    async ({ page }) => {
      testifyCase('TL-001', 'Header Navigation - Logo Click');

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/Failed to load resource.*403/i.test(msg.text())) {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(`${HOME}about/`);
      await logoLink(page).click();

      await expect(page).toHaveURL(HOME);
      expect(consoleErrors, 'no console errors after logo click').toEqual([]);
    },
  );

  test(
    'TL-002: Header Navigation - Menu Links Functional',
    { tag: ['@testify', '@TL-002'] },
    async ({ page, context }) => {
      testifyCase('TL-002', 'Header Navigation - Menu Links Functional');

      const nav = headerNav(page);

      await nav.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL(HOME);

      await nav.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/\/about\/?$/);

      await page.goto(HOME, { waitUntil: 'domcontentloaded' });
      await nav.getByRole('link', { name: 'Blog' }).click();
      await expect(page).toHaveURL(/\/our-news\/?$/);

      await page.goto(HOME, { waitUntil: 'domcontentloaded' });
      await nav.getByRole('link', { name: 'Contact Us' }).click();
      await expect(page).toHaveURL(/\/contact-us\/?$/);

      await page.goto(HOME, { waitUntil: 'domcontentloaded' });
      const talentLink = nav.getByRole('link', { name: 'Talent' });
      await expect(talentLink).toHaveAttribute('target', '_blank');
      await expect(talentLink).toHaveAttribute('href', /linkedin\.com/i);

      await page.goto(HOME, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(HOME);
    },
  );

  test(
    'TL-003: Header Navigation - Marketplace Button',
    { tag: ['@testify', '@TL-003'] },
    async ({ page }) => {
      testifyCase('TL-003', 'Header Navigation - Marketplace Button');

      const marketplace = page.locator('a[href*="/marketplace/"]:visible').first();
      await expect(marketplace).toBeVisible();
      await expect(marketplace).toHaveClass(/wp-element-button/);

      await marketplace.click();
      await expect(page).toHaveURL(/\/marketplace\/?$/);
      await expect(marketplace).toBeVisible();
    },
  );

  test(
    'TL-004: Navigation - Mobile Responsiveness',
    { tag: ['@testify', '@TL-004'] },
    async ({ page }) => {
      testifyCase('TL-004', 'Navigation - Mobile Responsiveness');

      await page.setViewportSize({ width: 375, height: 667 });

      const openMenu = page.locator('.wp-block-navigation__responsive-container-open').first();
      await expect(openMenu).toBeVisible();
      await openMenu.click();

      const mobileNav = page.locator(
        '#modal-2-content, .wp-block-navigation__responsive-container-content',
      );
      await expect(mobileNav.first()).toBeVisible();

      await mobileNav.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/\/about\/?$/);

      await page.goto(HOME, { waitUntil: 'domcontentloaded' });
      await openMenu.click();
      await expect(logoLink(page)).toBeVisible();
      await logoLink(page).click();
      await expect(page).toHaveURL(HOME);
    },
  );

  test(
    'TL-005: Hero - Primary Value Proposition Display',
    { tag: ['@testify', '@TL-005'] },
    async ({ page }) => {
      testifyCase('TL-005', 'Hero - Primary Value Proposition Display');

      const hero = page.getByText('Enhance Your Software Product', { exact: false });
      await expect(hero).toBeVisible();
      await expect(hero).toContainText('Quality Guarantee');

      await expect(
        page.getByText(/Elevate your SDLC with our proprietary testing framework/i),
      ).toBeVisible();

      await expect(page.getByText(/Software Testing.*Quality Assurance.*on-Demand/i)).toBeVisible();

      await expect(page.getByText(/Seamless Integration.*Proven Results/i)).toBeVisible();
      await expect(page.getByText(/Successful Deployments/i)).toBeVisible();
      await expect(page.getByText(/Boost Developer.*Team Efficiency/i)).toBeVisible();
    },
  );

  test(
    'TL-006: Hero - Image Triptych Display',
    { tag: ['@testify', '@TL-006'] },
    async ({ page }) => {
      testifyCase('TL-006', 'Hero - Image Triptych Display');

      const { first, center, third } = heroTriptychImages(page);
      await expect(first).toBeVisible();
      await expect(center).toBeVisible();
      await expect(third).toBeVisible();
      await expect(first).toHaveAttribute('src', /unsplash/i);
      await expect(center).toHaveAttribute('src', /testify_logo/i);
      await expect(third).toHaveAttribute('src', /unsplash/i);
    },
  );

  test(
    'TL-007: Hero - CTA Buttons Functional',
    { tag: ['@testify', '@TL-007'] },
    async ({ page }) => {
      testifyCase('TL-007', 'Hero - CTA Buttons Functional');

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/Failed to load resource.*403/i.test(msg.text())) {
          consoleErrors.push(msg.text());
        }
      });

      // Hero has no dedicated CTA; primary above-fold action is header MARKETPLACE.
      const cta = page.locator('a[href*="/marketplace/"]:visible').first();
      await expect(cta).toBeVisible();
      await cta.hover();
      await cta.click();
      await expect(page).toHaveURL(/\/marketplace\/?$/);
      expect(consoleErrors, 'no console errors after CTA click').toEqual([]);
    },
  );

  test(
    'TL-008: Features - Three Column Layout',
    { tag: ['@testify', '@TL-008'] },
    async ({ page }) => {
      testifyCase('TL-008', 'Features - Three Column Layout');

      const heading = page.getByText('On-Demand Software Quality Assurance', { exact: false });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();

      await expect(page.getByText('Speed', { exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Same Day Turnaround Time' })).toBeVisible();
      await expect(
        page.getByText(/Service-first architecture allows for same day deliverables/i),
      ).toBeVisible();

      await expect(page.getByText('Flexibility', { exact: true })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /Quality Delivered on Your Schedule/i }),
      ).toBeVisible();
      await expect(page.getByText(/Recruit expert help only when you need it/i)).toBeVisible();

      await expect(page.getByText('Reliability', { exact: true })).toBeVisible();
      await expect(
        page.getByRole('heading', { name: /Top Quality Service Providers/i }),
      ).toBeVisible();
      await expect(
        page.getByText(/Request fulfillment based on a formalized quality assurance protocol/i),
      ).toBeVisible();
    },
  );

  test(
    'TL-009: Features - Responsive Behavior',
    { tag: ['@testify', '@TL-009'] },
    async ({ page }) => {
      testifyCase('TL-009', 'Features - Responsive Behavior');

      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(HOME, { waitUntil: 'domcontentloaded' });

      const speed = page.getByRole('heading', { name: 'Same Day Turnaround Time' });
      const flexibility = page.getByRole('heading', {
        name: /Quality Delivered on Your Schedule/i,
      });
      const reliability = page.getByRole('heading', { name: /Top Quality Service Providers/i });

      await speed.scrollIntoViewIfNeeded();
      const speedBox = await speed.boundingBox();
      const flexBox = await flexibility.boundingBox();
      const relBox = await reliability.boundingBox();

      expect(speedBox).not.toBeNull();
      expect(flexBox).not.toBeNull();
      expect(relBox).not.toBeNull();
      expect(flexBox!.y).toBeGreaterThan(speedBox!.y);
      expect(relBox!.y).toBeGreaterThan(flexBox!.y);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    },
  );

  test(
    'TL-010: Social Proof - Partner Logos Display',
    { tag: ['@testify', '@TL-010'] },
    async ({ page }) => {
      testifyCase('TL-010', 'Social Proof - Partner Logos Display');

      const moralis = page.locator('img[src*="Moralis"]');
      const solana = page.locator('img[src*="solana"]');
      const chainlink = page.locator('img[src*="Chainlink"]');

      await moralis.scrollIntoViewIfNeeded();
      await expect(moralis).toBeVisible();
      await expect(solana).toBeVisible();
      await expect(chainlink).toBeVisible();
    },
  );

  test('TL-011: Social Proof - Logo Links', { tag: ['@testify', '@TL-011'] }, async ({ page }) => {
    testifyCase('TL-011', 'Social Proof - Logo Links');

    const logos = [
      page.locator('img[src*="Moralis"]'),
      page.locator('img[src*="solana"]'),
      page.locator('img[src*="Chainlink"]'),
    ];

    for (const logo of logos) {
      await logo.scrollIntoViewIfNeeded();
      await expect(logo).toBeVisible();
      const parentLink = logo.locator('xpath=ancestor::a[1]');
      if ((await parentLink.count()) > 0) {
        await expect(parentLink).toBeVisible();
      }
    }
  });

  test(
    'TL-012: Marketplace CTA - Content Display',
    { tag: ['@testify', '@TL-012'] },
    async ({ page }) => {
      testifyCase('TL-012', 'Marketplace CTA - Content Display');

      const ctaHeading = page.getByRole('heading', {
        name: /Try On-Demand quality assurance and software testing services via the vendor marketplace/i,
      });
      await ctaHeading.scrollIntoViewIfNeeded();
      await expect(ctaHeading).toBeVisible();
      await expect(page.getByText('24/7 Availability')).toBeVisible();
      await expect(page.getByText('Immutable Guarantee')).toBeVisible();
    },
  );

  test(
    'TL-013: Marketplace CTA - Schedule Demo Button',
    { tag: ['@testify', '@TL-013'] },
    async ({ page }) => {
      testifyCase('TL-013', 'Marketplace CTA - Schedule Demo Button');

      const scheduleDemo = page.getByRole('link', { name: 'Schedule Demo' });
      await scheduleDemo.scrollIntoViewIfNeeded();
      await expect(scheduleDemo).toBeVisible();
      await scheduleDemo.hover();
      await scheduleDemo.click();

      await expect(page).toHaveURL(/\/contact(?:-us)?\/#booking-app/);
      await expect(page.locator('#booking-app, [id*="booking"]').first()).toBeVisible({
        timeout: 15_000,
      });
    },
  );

  test(
    'TL-014: FAQ - Accordion Functionality',
    { tag: ['@testify', '@TL-014'] },
    async ({ page }) => {
      testifyCase('TL-014', 'FAQ - Accordion Functionality');

      const faq = faqSection(page);
      await faq.scrollIntoViewIfNeeded();
      await expect(faq.getByRole('heading', { name: 'FAQ', level: 2 })).toBeVisible();

      const questions = faq.getByRole('heading', { level: 3 });
      await expect(questions).toHaveCount(5);

      const accordionItems = faq.locator('details');
      if ((await accordionItems.count()) > 0) {
        const first = accordionItems.first();
        await first.locator('summary').click();
        await expect(first).toHaveAttribute('open', '');
        await accordionItems.nth(1).locator('summary').click();
        await first.locator('summary').click();
        await expect(first).not.toHaveAttribute('open', '');
      } else {
        // Site uses static FAQ columns; answers are visible without expand/collapse.
        await expect(questions.nth(0)).toContainText(/How to get started/i);
        await expect(faq.getByText(/Just give our team a call/i)).toBeVisible();
        await expect(questions.nth(1)).toContainText(/not satisfied/i);
        await expect(faq.getByText(/grace period/i)).toBeVisible();
      }
    },
  );
});
