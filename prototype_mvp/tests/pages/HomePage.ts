import { Page, Locator } from '@playwright/test';
import data from '../fixtures/homepage-data.json';

export class HomePage {
  readonly page: Page;
  readonly nav: Locator;
  readonly logoLink: Locator;
  readonly talentLink: Locator;
  readonly marketplaceBtn: Locator;
  readonly mobileMenuBtn: Locator;
  readonly mobileNav: Locator;
  
  readonly heroHeading: Locator;
  readonly heroSubtext1: Locator;
  readonly heroSubtext2: Locator;
  readonly heroTriptychFirst: Locator;
  readonly heroTriptychCenter: Locator;
  readonly heroTriptychThird: Locator;
  
  readonly featureOnDemandHeading: Locator;
  readonly featureSpeedText: Locator;
  readonly featureSpeedHeading: Locator;
  readonly featureFlexibilityText: Locator;
  readonly featureFlexibilityHeading: Locator;
  readonly featureReliabilityText: Locator;
  readonly featureReliabilityHeading: Locator;
  
  readonly partnerMoralis: Locator;
  readonly partnerSolana: Locator;
  readonly partnerChainlink: Locator;
  
  readonly marketplaceCtaHeading: Locator;
  readonly scheduleDemoBtn: Locator;
  
  readonly faqSection: Locator;
  readonly faqHeading: Locator;
  readonly faqQuestions: Locator;
  readonly faqAccordionItems: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Header
    this.nav = page.getByRole('navigation', { name: 'Header Navigation' });
    this.logoLink = page.getByRole('link', { name: 'Testify Labs' });
    this.talentLink = this.nav.getByRole('link', { name: 'Talent' });
    this.marketplaceBtn = page.locator('a[href*="/marketplace/"]:visible').first();
    this.mobileMenuBtn = page.locator('.wp-block-navigation__responsive-container-open').first();
    this.mobileNav = page.locator('#modal-2-content, .wp-block-navigation__responsive-container-content');
    
    // Hero
    this.heroHeading = page.getByText(data.hero.heading, { exact: false });
    this.heroSubtext1 = page.getByText(data.hero.subtext1, { exact: false });
    this.heroSubtext2 = page.getByText(data.hero.subtext2, { exact: false });
    
    const triptychAll = page.locator('figure img');
    this.heroTriptychFirst = triptychAll.nth(0);
    this.heroTriptychCenter = triptychAll.nth(1);
    this.heroTriptychThird = triptychAll.nth(2);
    
    // Features
    this.featureOnDemandHeading = page.getByText(data.features.heading, { exact: false });
    this.featureSpeedText = page.getByText(data.features.speed, { exact: true });
    this.featureSpeedHeading = page.getByRole('heading', { name: 'Same Day Turnaround Time' });
    this.featureFlexibilityText = page.getByText(data.features.flexibility, { exact: true });
    this.featureFlexibilityHeading = page.getByRole('heading', { name: /Quality Delivered on Your Schedule/i });
    this.featureReliabilityText = page.getByText(data.features.reliability, { exact: true });
    this.featureReliabilityHeading = page.getByRole('heading', { name: /Top Quality Service Providers/i });

    // Partners
    this.partnerMoralis = page.locator('img[src*="Moralis"]').first();
    this.partnerSolana = page.locator('img[src*="solana"]').first();
    this.partnerChainlink = page.locator('img[src*="Chainlink"]').first();
    
    // Marketplace CTA
    this.marketplaceCtaHeading = page.getByRole('heading', { name: new RegExp(data.cta.heading, 'i') });
    this.scheduleDemoBtn = page.getByRole('link', { name: 'Schedule Demo' });
    
    // FAQ
    this.faqSection = page.locator('#faq');
    this.faqHeading = this.faqSection.getByRole('heading', { name: 'FAQ', level: 2 });
    this.faqQuestions = this.faqSection.getByRole('heading', { level: 3 });
    this.faqAccordionItems = this.faqSection.locator('details');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }
}
