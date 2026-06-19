@login @regression
Feature: User Authentication

  @smoke @positive
  Scenario Outline: <action> with valid credentials
    Given I am on the login page
    When I <step> with valid credentials
    Then I should see a native alert saying <message>

    @C1001
    Examples: Login
      | action | step  | message |
      | Login  | login | Success |

    @C1002
    Examples: Sign Up
      | action  | step    | message   |
      | Sign Up | sign up | Signed Up |

  @negative @C1003
  Scenario: Login with invalid credentials shows an error
    Given I am on the login page
    When I login with invalid credentials
    Then I should see a native alert saying An error has occurred

  @negative @C1004
  Scenario: Login with empty credentials shows an error
    Given I am on the login page
    When I login with empty credentials
    Then I should see a native alert saying An error has occurred
