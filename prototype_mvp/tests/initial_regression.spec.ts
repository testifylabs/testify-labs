import { test, expect } from '@playwright/test';
import { testifyCase } from './helpers/testify-case';
import { HomePage } from './pages/HomePage';
import data from './fixtures/homepage-data.json';

test.describe('Testify Solutions Homepage Regression', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    'TL-001: Header Navigation - Logo Click',
    { tag: ['@testify', '@TL-001'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-001', 'Header Navigation - Logo Click');

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/Failed to load resource.*403/i.test(msg.text())) {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/about/');
      if (isMobile) {
        await homePage.mobileMenuBtn.click();
      }
      await homePage.logoLink.click();

      await expect(page).toHaveURL(/.*testifysolutions.net\/?$/);
      expect(consoleErrors, 'no console errors after logo click').toEqual([]);
    },
  );

  test(
    'TL-002: Header Navigation - Menu Links Functional',
    { tag: ['@testify', '@TL-002'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-002', 'Header Navigation - Menu Links Functional');
      test.skip(isMobile, 'Mobile navigation is handled in TL-004');

      await homePage.nav.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL(/.*testifysolutions.net\/?$/);

      await homePage.nav.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/\/about\/?$/);

      await homePage.goto();
      await homePage.nav.getByRole('link', { name: 'Blog' }).click();
      await expect(page).toHaveURL(/\/our-news\/?$/);

      await homePage.goto();
      await homePage.nav.getByRole('link', { name: 'Contact Us' }).click();
      await expect(page).toHaveURL(/\/contact-us\/?$/);

      await homePage.goto();
      await expect(homePage.talentLink).toHaveAttribute('target', '_blank');
      await expect(homePage.talentLink).toHaveAttribute('href', /linkedin\.com/i);
    },
  );

  test(
    'TL-003: Header Navigation - Marketplace Button',
    { tag: ['@testify', '@TL-003'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-003', 'Header Navigation - Marketplace Button');
      test.skip(isMobile, 'Header marketplace button is hidden on mobile layout');

      await expect(homePage.marketplaceBtn).toBeVisible();
      await expect(homePage.marketplaceBtn).toHaveClass(/wp-element-button/);

      await homePage.marketplaceBtn.click();
      await expect(page).toHaveURL(/\/marketplace\/?$/);
      await expect(homePage.marketplaceBtn).toBeVisible();
    },
  );

  test(
    'TL-004: Navigation - Mobile Responsiveness',
    { tag: ['@testify', '@TL-004'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-004', 'Navigation - Mobile Responsiveness');
      test.skip(!isMobile, 'This test specifically validates mobile navigation flows');

      await expect(homePage.mobileMenuBtn).toBeVisible();
      await homePage.mobileMenuBtn.click();

      await expect(homePage.mobileNav.first()).toBeVisible();

      await homePage.mobileNav.getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/\/about\/?$/);

      await homePage.goto();
      await homePage.mobileMenuBtn.click();
      await expect(homePage.logoLink).toBeVisible();
      await homePage.logoLink.click();
      await expect(page).toHaveURL(/.*testifysolutions.net\/?$/);
    },
  );

  test(
    'TL-005: Hero - Primary Value Proposition Display',
    { tag: ['@testify', '@TL-005'] },
    async ({ page }) => {
      testifyCase('TL-005', 'Hero - Primary Value Proposition Display');

      await expect(homePage.heroHeading).toBeVisible();
      await expect(homePage.heroHeading).toContainText('Quality Guarantee');

      await expect(homePage.heroSubtext1).toBeVisible();
      await expect(homePage.heroSubtext2).toBeVisible();

      await expect(page.getByText(/Seamless Integration.*Proven Results/i)).toBeVisible();
    },
  );

  test(
    'TL-006: Hero - Image Triptych Display',
    { tag: ['@testify', '@TL-006'] },
    async ({ isMobile }) => {
      testifyCase('TL-006', 'Hero - Image Triptych Display');
      test.skip(isMobile, 'Triptych images stack or hide on mobile');

      await expect(homePage.heroTriptychFirst).toBeVisible();
      await expect(homePage.heroTriptychCenter).toBeVisible();
      await expect(homePage.heroTriptychThird).toBeVisible();
      
      await expect(homePage.heroTriptychFirst).toHaveAttribute('src', /unsplash/i);
      await expect(homePage.heroTriptychCenter).toHaveAttribute('src', /testify_logo/i);
      await expect(homePage.heroTriptychThird).toHaveAttribute('src', /unsplash/i);
    },
  );

  test(
    'TL-007: Hero - CTA Buttons Functional',
    { tag: ['@testify', '@TL-007'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-007', 'Hero - CTA Buttons Functional');
      test.skip(isMobile, 'Marketplace CTA might be hidden on mobile viewports in hero');

      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/Failed to load resource.*403/i.test(msg.text())) {
          consoleErrors.push(msg.text());
        }
      });

      await expect(homePage.marketplaceBtn).toBeVisible();
      await homePage.marketplaceBtn.hover();
      await homePage.marketplaceBtn.click();
      await expect(page).toHaveURL(/\/marketplace\/?$/);
      expect(consoleErrors, 'no console errors after CTA click').toEqual([]);
    },
  );

  test(
    'TL-008: Features - Three Column Layout',
    { tag: ['@testify', '@TL-008'] },
    async ({ page }) => {
      testifyCase('TL-008', 'Features - Three Column Layout');

      await homePage.featureOnDemandHeading.scrollIntoViewIfNeeded();
      await expect(homePage.featureOnDemandHeading).toBeVisible();

      await expect(homePage.featureSpeedText).toBeVisible();
      await expect(homePage.featureSpeedHeading).toBeVisible();
      await expect(page.getByText(/Service-first architecture allows for same day deliverables/i)).toBeVisible();

      await expect(homePage.featureFlexibilityText).toBeVisible();
      await expect(homePage.featureFlexibilityHeading).toBeVisible();
      await expect(page.getByText(/Recruit expert help only when you need it/i)).toBeVisible();
    },
  );

  test(
    'TL-009: Features - Responsive Behavior',
    { tag: ['@testify', '@TL-009'] },
    async ({ page, isMobile }) => {
      testifyCase('TL-009', 'Features - Responsive Behavior');
      test.skip(!isMobile, 'Stacking behavior only visible on mobile projects');

      await homePage.featureSpeedHeading.scrollIntoViewIfNeeded();
      const speedBox = await homePage.featureSpeedHeading.boundingBox();
      const flexBox = await homePage.featureFlexibilityHeading.boundingBox();
      const relBox = await homePage.featureReliabilityHeading.boundingBox();

      expect(speedBox).not.toBeNull();
      expect(flexBox).not.toBeNull();
      expect(relBox).not.toBeNull();
      expect(flexBox!.y).toBeGreaterThan(speedBox!.y);
      expect(relBox!.y).toBeGreaterThan(flexBox!.y);
    },
  );

  test(
    'TL-010: Social Proof - Partner Logos Display',
    { tag: ['@testify', '@TL-010'] },
    async () => {
      testifyCase('TL-010', 'Social Proof - Partner Logos Display');

      await homePage.partnerMoralis.scrollIntoViewIfNeeded();
      await expect(homePage.partnerMoralis).toBeVisible();
      await expect(homePage.partnerSolana).toBeVisible();
      await expect(homePage.partnerChainlink).toBeVisible();
    },
  );

  test('TL-011: Social Proof - Logo Links', { tag: ['@testify', '@TL-011'] }, async () => {
    testifyCase('TL-011', 'Social Proof - Logo Links');

    const logos = [homePage.partnerMoralis, homePage.partnerSolana, homePage.partnerChainlink];

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

      await homePage.marketplaceCtaHeading.scrollIntoViewIfNeeded();
      await expect(homePage.marketplaceCtaHeading).toBeVisible();
      await expect(page.getByText(data.cta.availability)).toBeVisible();
      await expect(page.getByText(data.cta.guarantee)).toBeVisible();
    },
  );

  test(
    'TL-013: Marketplace CTA - Schedule Demo Button',
    { tag: ['@testify', '@TL-013'] },
    async ({ page }) => {
      testifyCase('TL-013', 'Marketplace CTA - Schedule Demo Button');

      await homePage.scheduleDemoBtn.scrollIntoViewIfNeeded();
      await expect(homePage.scheduleDemoBtn).toBeVisible();
      await homePage.scheduleDemoBtn.hover();
      await homePage.scheduleDemoBtn.click();

      await expect(page).toHaveURL(/\/contact(?:-us)?\/#booking-app/);
    },
  );

  test(
    'TL-014: FAQ - Accordion Functionality',
    { tag: ['@testify', '@TL-014'] },
    async ({ page }) => {
      testifyCase('TL-014', 'FAQ - Accordion Functionality');

      await homePage.faqSection.scrollIntoViewIfNeeded();
      await expect(homePage.faqHeading).toBeVisible();

      await expect(homePage.faqQuestions).toHaveCount(5);

      if ((await homePage.faqAccordionItems.count()) > 0) {
        const first = homePage.faqAccordionItems.first();
        await first.locator('summary').click();
        await expect(first).toHaveAttribute('open', '');
        await homePage.faqAccordionItems.nth(1).locator('summary').click();
        await first.locator('summary').click();
        await expect(first).not.toHaveAttribute('open', '');
      } else {
        await expect(homePage.faqQuestions.nth(0)).toContainText(/How to get started/i);
      }
    },
  );
});
