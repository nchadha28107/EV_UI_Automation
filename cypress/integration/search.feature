@search
Feature: EV Search Functionality
  As a user of the EV application
  I want to search for electric vehicles
  So that I can find specific EVs that match my criteria

  Background:
    Given I am on the EV application homepage
    And the search functionality is available
    And the search section displays correctly
#   @smoke
#   Scenario: Successful search with valid keyword
#     When I enter "Tesla" in the search field
#     And I click the search button
#     Then I should see search results containing "Tesla"
#     And the results should be displayed in a grid format
#     And each result should contain vehicle information
#   @positive
#   Scenario: Search with partial vehicle name
#     When I enter "Model" in the search field
#     And I click the search button
#     Then I should see search results containing "Model"
#     And the search term should be highlighted in the results
#   @positive
#   Scenario: Search with different vehicle attributes
#     When I enter "SUV" in the search field
#     And I click the search button
#     Then I should see search results containing "SUV"
#   @negative
#   Scenario: Search with no results
#     When I enter "InvalidVehicleName12345" in the search field
#     And I click the search button
#     Then I should see no result found message
#   @edge-case
#   Scenario: Search with special characters
#     When I enter "@#$%^&*()" in the search field
#     And I click the search button
#     Then I should see no result found message
#   @functionality
#   Scenario: Search results navigation
#     When I enter "Electric" in the search field
#     And I click the search button
#     And I should see search results containing "Electric"
#     When I click on a search result
#     Then I should be navigated to the vehicle details page
#     # And the vehicle details should match the selected result

  @validation
  Scenario: Search field validation with minlength requirement
    When I leave the search field empty
    Then the search button should be disabled
    When I enter "Te" in the search field
    Then the search button should be enabled
    When I can click the search button
    Then I should see search field validation message
    When I enter "Tes" in the search field
    Then the search button should be enabled
    And I can click the search button
#   @ui
#   Scenario: Clear button functionality
#     Given I enter "Tesla" in the search field
#     When I click the clear button
#     Then I should be redirected to the homepage
#     And the search field should be empty
