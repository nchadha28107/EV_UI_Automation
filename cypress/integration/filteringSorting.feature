Feature: EV Listings Filtering and Sorting
  As a user looking for electric vehicles
  I want to filter and sort the EV listings
  So that I can find vehicles that match my preferences

  Background:
    Given I am on the EV application homepage

  @smoke @filtering @positive
  Scenario: Filter by vehicle condition - New vehicles
    When I select "New" from the condition filter
    Then I should see only "New" vehicles in the results
    And the condition filter should show "New" as selected
    And the URL should be updated with the filter parameter

  @filtering @positive
  Scenario: Filter by vehicle condition - Used vehicles
    When I select "Used" from the condition filter
    Then I should see only "Used" vehicles in the results
    And the condition filter should show "Used" as selected
    And the URL should be updated with the filter parameter

  @filtering @positive
  Scenario: Reset condition filter to show all vehicles
    Given I select "New" from the condition filter
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
    Given I select "Low to High" from the sort filter
    And the sort filter should show "Low to High" as selected
    When I select "Sort" from the sort filter
    Then the vehicles should be displayed in default order
    And the sort filter should show "Sort" as selected
    And the URL should not contain sort parameter

  @filtering @positive @combination
  Scenario: Apply both condition and sort filters together
    When I select "New" from the condition filter
    And I select "Low to High" from the sort filter
    Then I should see only "New" vehicles sorted by price ascending
    And the condition filter should show "New" as selected
    And the sort filter should show "Low to High" as selected
    And the URL should contain both condition and sort parameters

  @filtering @positive @combination
  Scenario: Change filter combination
    Given I have filtered by "Used" condition and "High to Low" sort
    When I select "New" from the condition filter
    And I select "Low to High" from the sort filter
    Then I should see only "New" vehicles sorted by price ascending
    And the condition filter should show "New" as selected
    And the sort filter should show "Low to High" as selected
    And the URL should reflect the new filter combination

  @filtering @negative
  Scenario: Verify filter options are always available
    When I interact with the condition filter dropdown
    Then I should see filter options: "All", "New", "Used"
    When I interact with the sort filter dropdown
    Then I should see sorting options: "Sort", "Low to High", "High to Low"
    And all filter options should be clickable

  @filtering @persistence
  Scenario: Filter state persistence during navigation
    Given I select "Used" from the condition filter
    And I select "Low to High" from the sort filter
    When I navigate to a vehicle details page
    And I click Back to Listing button
    Then the condition filter should show "Used" as selected
    Then the sort filter should show "Low to High" as selected
    And I should see only "Used" vehicles in the results
    And the vehicles should be sorted by price in ascending order

  @filtering @search-integration
  Scenario: Filters work with search results
    Given I enter "Tesla" in the search field
    And I click the search button
    Then I should see search results containing "Tesla"
    When I select "New" from the condition filter
    Then I should see search results containing "Tesla"
    And I should see only "New" vehicles in the results
    And the search term should be preserved
    And both search and filter parameters should be in URL