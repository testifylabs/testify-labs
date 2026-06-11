Feature: Initial Regression Suite for Artashes Kocharyan's Portfolio

  Scenario: Recruiter/Hiring Manager Review
    Given I am on the portfolio homepage
    When I navigate to the "Portfolio" section
    And I navigate to the "Resume" section
    And I navigate to the "Contact" section
    Then I should be on the contact page

  Scenario: Project Deep Dive
    Given I am on the portfolio homepage
    When I navigate to the "Portfolio" section
    And I click on the "Twitter Bot" project link
    Then I should be on the project's GitHub page

  Scenario: External Professional Profile Verification
    Given I am on the portfolio homepage
    When I navigate to the "LinkedIn" profile
    Then I should be on the LinkedIn profile page
    When I navigate back
    And I navigate to the "GitHub" profile
    Then I should be on the GitHub profile page
