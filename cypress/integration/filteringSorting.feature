Feature: EV Listings Filtering and Sorting
  As a user looking for electric vehicles
  I want to filter and sort the EV listings
  So that I can find vehicles that match my preferences

  Background:
    Given I am on the EV application homepage

  @smoke @filtering @positive
  Scenario: Filter by vehicle condition - New vehicles
    When I select "New" from the condition filter
    Then I should see only new vehicles in the results
    And the condition filter should show "New" as selected
    And the URL should be updated with the condition parameter

  @filtering @positive
  Scenario: Filter by vehicle condition - Used vehicles
    When I select "Used" from the condition filter
    Then I should see only used vehicles in the results
    And the condition filter should show "Used" as selected
    And the URL should be updated with the condition parameter

  @filtering @positive
  Scenario: Reset condition filter to show all vehicles
    Given I have applied a condition filter
    When I select "All" from the condition filter
    Then I should see all vehicles regardless of condition
    And the condition filter should show "All" as selected
    And the URL should not contain condition parameter

  @smoke @sorting @positive
  Scenario: Sort vehicles by price - Low to High
    When I select "Low to High" from the sort filter
    Then the vehicles should be sorted by price in ascending order
    And the sort filter should show "Low to High" as selected
    And the URL should be updated with the sort parameter

  @sorting @positive
  Scenario: Sort vehicles by price - High to Low
    When I select "High to Low" from the sort filter
    Then the vehicles should be sorted by price in descending order
    And the sort filter should show "High to Low" as selected
    And the URL should be updated with the sort parameter

  @sorting @positive
  Scenario: Reset sort filter to default order
    Given I have applied a sort filter
    When I select "Sort" from the sort filter
    Then the vehicles should be displayed in default order
    And the sort filter should show "Sort" as selected
    And the URL should not contain sort parameter

  @filtering @positive @combination
  Scenario: Apply both condition and sort filters together
    When I select "New" from the condition filter
    And I select "Low to High" from the sort filter
    Then I should see only new vehicles sorted by price ascending
    And both filters should retain their selected values
    And the URL should contain both condition and sort parameters

  @filtering @positive @combination
  Scenario: Change filter combination
    Given I have filtered by "Used" condition and "High to Low" sort
    When I select "New" from the condition filter
    And I select "Low to High" from the sort filter
    Then I should see only new vehicles sorted by price ascending
    And the previous filter selections should be updated
    And the URL should reflect the new filter combination

  @filtering @edge-case
  Scenario: Apply filters when no results match criteria
    Given there are no new vehicles available
    When I select "New" from the condition filter
    Then I should see a "no results found" message
    And the condition filter should remain as "New"
    And the page should handle empty results gracefully

  @filtering @negative
  Scenario: Verify filter options are always available
    When I interact with the condition filter dropdown
    Then I should see options: "All", "New", "Used"
    When I interact with the sort filter dropdown
    Then I should see options: "Sort", "Low to High", "High to Low"
    And all filter options should be clickable

#   @filtering @persistence
#   Scenario: Filter state persistence during navigation
#     Given I have applied condition filter "Used" and sort "Low to High"
#     When I navigate to a vehicle details page
#     And I return to the listings page using browser back
#     Then the applied filters should be maintained
#     And the filtered results should be displayed correctly

  @filtering @performance
  Scenario: Filter response time validation
    When I select "New" from the condition filter
    Then the results should update within 3 seconds
    When I select "High to Low" from the sort filter
    Then the results should update within 3 seconds
    And the page should remain responsive during filtering

  @filtering @accessibility
  Scenario: Filter accessibility validation
    Then the condition filter should have proper aria-label
    And the sort filter should have proper aria-label
    And filters should be keyboard navigable
    And filter changes should be announced to screen readers

  @filtering @search-integration
  Scenario: Filters work with search results
    Given I have searched for "tesla"
    When I select "New" from the condition filter
    Then I should see only new Tesla vehicles
    And the search term should be preserved
    And both search and filter parameters should be in URL

  @filtering @ui-validation
  Scenario: Filter UI elements validation
    Then the condition filter should display with default "All" selected
    And the sort filter should display with default "Sort" selected
    And both filters should have consistent styling
    And filters should be positioned correctly in the header section