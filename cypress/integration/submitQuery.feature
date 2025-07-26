Feature: Submit Query
  As a potential EV buyer
  I want to submit a query about vehicles or services
  So that I can get more information from the dealer

  Background:
    Given I am on the EV application homepage

  Scenario: Successfully open submit query modal
    When I click the Submit Query button
    Then the submit query modal is open
    And I should see the modal title "Submit your request here"
    And I should see the enquiry title field
    And I should see the description field
    And I should see the Add submit button

  Scenario: Submit valid query form with different content lengths
    Given I click the Submit Query button
    When I fill in the enquiry title with "<title>"
    And I fill in the description with "<description>"
    And I submit the query form
    Then the query should be submitted successfully
    And the submit query modal is open

    Examples:
      | title                   | description                                                                   |
      | Short title             | Short description                                                             |
      | Very long enquiry title | Very detailed description with lots of information about what I'm looking for |
      | EV Info                 | Need specs                                                                    |

  Scenario: Form validation for required fields
    Given I click the Submit Query button
    When I submit the query form without filling required fields
    Then I should see validation error for enquiry title field
    And the form should not be submitted

  Scenario: Enquiry title field validation
    Given I click the Submit Query button
    When I leave the enquiry title field empty
    And I fill in the description with "Test description"
    And I submit the query form
    Then I should see validation error for enquiry title field

  Scenario: Description field validation
    Given I click the Submit Query button
    When I fill in the enquiry title with "Test Title"
    And I leave the description field empty
    And I submit the query form
    Then I should see validation error for description field

  Scenario: Enquiry title minimum length validation
    Given I click the Submit Query button
    When I fill in the enquiry title with "Hi"
    And I fill in the description with "Valid description"
    And I submit the query form
    Then I should see "minimum" length validation error for "title" field
    And the form should not be submitted

  Scenario: Enquiry title maximum length validation
    Given I click the Submit Query button
    When I fill in the enquiry title with "Interested in Tesla Model 3"
    And I fill in the description with "Valid description"
    And I submit the query form
    Then I should see "maximum" length validation error for "title" field
    And the form should not be submitted

  Scenario: Description maximum length validation
    Given I click the Submit Query button
    When I fill in the enquiry title with "Valid Title"
    And I fill in the description with text exceeding 100 characters
    And I submit the query form
    Then I should see "maximum" length validation error for "description" field
    And the form should not be submitted

  Scenario: Close modal using X button
    Given I click the Submit Query button
    When I click the query close button
    Then the submit query modal should close

  Scenario: Form accessibility features
    Given I click the Submit Query button
    Then form labels should be properly associated with inputs
    And required fields should be clearly marked with asterisk
    And the form should be keyboard navigable
