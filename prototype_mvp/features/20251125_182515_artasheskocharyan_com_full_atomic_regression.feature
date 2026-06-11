Feature: Full Atomic Regression Suite for Artashes Kocharyan's Portfolio

  Background:
    Given I am on the portfolio homepage

  @regression @smoke
  Scenario: Verify navigation to Intro section
    When I navigate to the "Intro" section
    Then the URL should contain "#top"

  @regression @smoke
  Scenario: Verify navigation to About Me section
    When I navigate to the "About Me" section
    Then the URL should contain "#about"

  @regression @smoke
  Scenario: Verify navigation to Portfolio section
    When I navigate to the "Portfolio" section
    Then the URL should contain "#portfolio"

  @regression @smoke
  Scenario: Verify navigation to Resume section
    When I navigate to the "Resume" section
    Then the URL should contain "#resume"

  @regression @smoke
  Scenario: Verify navigation to Contact section
    When I navigate to the "Contact" section
    Then the URL should contain "#contact"

  @regression @edge
  Scenario: Verify contact form with empty name
    Given I am on the contact page
    When I fill the contact form with an empty name
    Then a validation error should be visible for the name field

  @regression @edge
  Scenario: Verify contact form with empty email
    Given I am on the contact page
    When I fill the contact form with an empty email
    Then a validation error should be visible for the email field

  @regression @edge
  Scenario: Verify contact form with empty message
    Given I am on the contact page
    When I fill the contact form with an empty message
    Then a validation error should be visible for the message field

  @regression @edge
  Scenario: Verify contact form with invalid email
    Given I am on the contact page
    When I fill the contact form with an invalid email
    Then a validation error should be visible for the email field

  @regression @edge
  Scenario: Verify contact form with long name
    Given I am on the contact page
    When I fill the contact form with a very long name
    Then the form should accept the long name

  @regression @edge
  Scenario: Verify contact form with long message
    Given I am on the contact page
    When I fill the contact form with a very long message
    Then the form should accept the long message

  @regression @security
  Scenario: Verify contact form with XSS in name field
    Given I am on the contact page
    When I fill the contact form with an XSS script in the name field
    Then the submission should be sanitized

  @regression @smoke
  Scenario: Verify LinkedIn external link
    When I click the "LinkedIn" link
    Then I should be on the LinkedIn page

  @regression @smoke
  Scenario: Verify GitHub external link
    When I click the "GitHub" link
    Then I should be on the GitHub page

  @regression @smoke
  Scenario: Verify Twitter external link
    When I click the "Twitter" link
    Then I should be on the Twitter page

  @regression @ui
  Scenario: Verify all images load
    Then all images on the page should load successfully

  @regression @error-handling
  Scenario: Verify 404 page
    When I navigate to a non-existent page
    Then the page should indicate a "404 Not Found" error
