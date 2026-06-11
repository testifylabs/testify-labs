Feature: Testify Solutions Homepage Regression (TL-001 – TL-014)

  @TL-001
  Scenario: Header Navigation - Logo Click
    Given I am on a non-home page of Testify Solutions
    When I click the Testify Labs logo in the header
    Then I should be on the homepage

  @TL-002
  Scenario: Header Navigation - Menu Links Functional
    Given I am on the Testify Solutions homepage
    When I click each header navigation link
    Then each destination page should load correctly

  @TL-003
  Scenario: Header Navigation - Marketplace Button
    Given I am on the Testify Solutions homepage
    When I click the MARKETPLACE button
    Then I should be on the marketplace page

  @TL-004
  Scenario: Navigation - Mobile Responsiveness
    Given I am on the Testify Solutions homepage on a mobile viewport
    When I open the hamburger menu and select About
    Then I should be on the about page
    And the logo should remain visible in the mobile menu

  @TL-005
  Scenario: Hero - Primary Value Proposition Display
    Given I am on the Testify Solutions homepage
    Then the hero headline, subheadline, badge, and checkmarks should be visible

  @TL-006
  Scenario: Hero - Image Triptych Display
    Given I am on the Testify Solutions homepage
    Then three hero images should be visible with the Testify logo centered

  @TL-007
  Scenario: Hero - CTA Buttons Functional
    Given I am on the Testify Solutions homepage
    When I click the primary MARKETPLACE CTA
    Then I should reach the marketplace without console errors

  @TL-008
  Scenario: Features - Three Column Layout
    Given I am on the Testify Solutions homepage
    When I scroll to the features section
    Then three feature cards with Speed, Flexibility, and Reliability should be visible

  @TL-009
  Scenario: Features - Responsive Behavior
    Given I am on the Testify Solutions homepage on a mobile viewport
    When I scroll to the features section
    Then feature cards should stack vertically without horizontal scroll

  @TL-010
  Scenario: Social Proof - Partner Logos Display
    Given I am on the Testify Solutions homepage
    Then Moralis, Solana, and Chainlink logos should be visible

  @TL-011
  Scenario: Social Proof - Logo Links
    Given partner logos are visible on the homepage
    Then each logo should be visible and optionally linked

  @TL-012
  Scenario: Marketplace CTA - Content Display
    Given I am on the Testify Solutions homepage
    When I scroll to the marketplace CTA section
    Then the headline and feature callouts should be visible

  @TL-013
  Scenario: Marketplace CTA - Schedule Demo Button
    Given I am on the Testify Solutions homepage
    When I click Schedule Demo
    Then I should land on the contact booking widget

  @TL-014
  Scenario: FAQ section
    Given I am on the Testify Solutions homepage
    When I scroll to the FAQ section
    Then FAQ questions and answers should be accessible
