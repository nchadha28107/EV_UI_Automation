Feature: Pagination and Navigation
  As a user browsing electric vehicles
  I want to navigate through multiple pages of results
  So that I can view all available vehicles efficiently

  Background:
    Given I am on the EV application homepage
    And the page contains vehicle listings

  @smoke @pagination @positive
  Scenario: Verify pagination controls are displayed
    Then I should see the pagination section
    And I should see the page information display
    And I should see the Previous button
    And I should see the Next button

  @pagination @positive
  Scenario: Navigate to next page from first page
    Given I am on page 1 of the results
    When I click the Next button
    Then I should be on page 2 of the results
    And the URL should reflect the current page number
    And the page information should show page 2
    And the Previous button should be enabled
    And different vehicles should be displayed

  @pagination @positive
  Scenario: Navigate to previous page from second page
    Given I am on page 2 of the results
    When I click the Previous button
    Then I should be on page 1 of the results
    And the URL should reflect the current page number
    And the page information should show page 1
    And the Previous button should be disabled

  @pagination @boundary
  Scenario: Previous button is disabled on first page
    Given I am on page 1 of the results
    Then the Previous button should be disabled
    And the Next button should be enabled
    And the page information should show page 1

  @pagination @boundary
  Scenario: Next button is disabled on last page
    Given I am on the last page of results
    Then the Next button should be disabled
    And the Previous button should be enabled
    And the page information should show the last page number

  @pagination @positive
  Scenario: Navigate through multiple pages sequentially
    Given I am on page 1 of the results
    When I click the Next button
    Then I should be on page 2 of the results
    When I click the Next button
    Then I should be on page 3 of the results
    When I click the Previous button
    Then I should be on page 2 of the results

  @pagination @url-persistence
  Scenario: Page number persists in URL
    Given I am on page 1 of the results
    When I click the Next button
    Then the URL should contain "page=2"
    When I refresh the page
    Then I should still be on page 2 of the results
    And the page information should show page 2

  @pagination @filtering-integration
  Scenario: Pagination works with filters applied
    Given I select "New" from the condition filter
    And I am on page 1 of the filtered results
    When I click the Next button
    Then I should be on page 2 of the filtered results
    And the URL should contain both filter and page parameters
    And I should see only "New" vehicles in the results

  @pagination @combined-filters
  Scenario: Pagination with combined search and filters
    Given I enter "Electric" in the search field
    And I click the search button
    And I should see search results containing "Electric"
    And I select "Used" from the condition filter
    And I select "Low to High" from the sort filter
    And I am on page 1 of the combined results
    When I click the Next button
    Then I should be on page 2 of the combined results
    And the URL should contain search, filter, sort, and page parameters
    And the applied filters should remain active

  @pagination @navigation-back
  Scenario: Browser back button navigation with pagination
    Given I am on page 1 of the results
    When I click the Next button
    And I should be on page 2 of the results
    When I click the browser back button
    Then I should be back on page 1 of the results
    And the page information should show page 1

  @pagination @direct-url-access
  Scenario: Direct URL access to specific page
    When I navigate directly to page 3 via URL
    Then I should be on page 3 of the results
    And the page information should show page 3

  @pagination @empty-results
  Scenario: Pagination behavior with no results
    Given I enter "NonExistentVehicle123" in the search field
    And I click the search button
    Then I should see no result found message
    And the pagination section should not be displayed

  @pagination @single-page-results
  Scenario: Pagination behavior with single page of results
    Given I enter "Tesla" in the search field
    And I click the search button
    Then the Previous button should be disabled
    And the Next button should be disabled

  @pagination @state-preservation
  Scenario: State preservation during pagination
    Given I select "New" from the condition filter
    And I select "High to Low" from the sort filter
    And I am on page 2 of the results
    When I navigate to a vehicle details page
    And I click Back to Listing button
    Then I should return to page 2 of the results
    And the condition filter should show "New" as selected
    And the sort filter should show "High to Low" as selected