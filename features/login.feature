@login @regression
Feature: User Authentication

  @smoke @positive @C1001
  Scenario: Valid credentials complete the login flow
    Given I am on the login page
    When I login with test@webdriver.io and Test1234!
    Then I should see a native alert saying Success

  @smoke @positive @C1002
  Scenario: Valid credentials complete the sign-up flow
    Given I am on the login page
    When I sign up with test@webdriver.io and Test1234!
    Then I should see a native alert saying Signed Up
