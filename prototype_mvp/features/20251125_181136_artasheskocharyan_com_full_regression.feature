Feature: Full Regression Suite for Artashes Kocharyan's Portfolio
  @regression @smoke
  Scenario: Verify successful navigation to all main sections
    Given I am on the portfolio homepage
    When I navigate to the "Intro" section
    Then the URL should contain "#top"
    When I navigate to the "About Me" section
    Then the URL should contain "#about"
    When I navigate to the "Portfolio" section
    Then the URL should contain "#portfolio"
    When I navigate to the "Resume" section
    Then the URL should contain "#resume"
    When I navigate to the "Contact" section
    Then the URL should contain "#contact"

  @regression @edge
  Scenario Outline: Verify contact form submission with various inputs
    Given I am on the contact page
    When I fill the contact form with "<name>", "<email>", and "<message>"
    Then I should see the appropriate validation messages for "<type>" of input

    Examples:
      | name        | email              | message      | type    |
      |             | test@email.com     | test message | invalid |
      | test name   |                    | test message | invalid |
      | test name   | test@email.com     |              | invalid |
      | test name   | invalid-email      | test message | invalid |
      | <long name> | test@email.com     | test message | valid   |
      | test name   | test@email.com     | <long msg>   | valid   |
      | test name   | <xss>@email.com    | <xss>        | invalid |

  @regression @smoke
  Scenario: Verify all external links are functional
    Given I am on the portfolio homepage
    When I click the "LinkedIn" link
    Then I should be on the LinkedIn page
    When I go back
    When I click the "GitHub" link
    Then I should be on the GitHub page
    When I go back
    When I click the "Twitter" link
    Then I should be on the Twitter page

  @regression @ui
  Scenario: Verify all images load correctly
    Given I am on the portfolio homepage
    Then all images on the page should load successfully

  @regression @error-handling
  Scenario: Verify 404 page for non-existent routes
    Given I navigate to a non-existent page
    Then I should see a "404 Not Found" message or be redirected to the homepage
