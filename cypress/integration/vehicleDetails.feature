Feature: Vehicle Details Page
  As a user interested in a specific electric vehicle
  I want to view detailed information about the vehicle
  So that I can make an informed purchasing decision

  Background:
    Given I am on the EV application homepage
    And the page contains vehicle listings

  @smoke @vehicle-details @positive
  Scenario: Vehicle details page loads successfully
    And I navigate to a vehicle details page
    Then I should be on the vehicle details page
    And I should see the vehicle navigation header
    And I should see the main vehicle image
    And I should see the vehicle title and year
    And I should see the vehicle price with proper currency formatting
    And I should see the vehicle specifications section
    And I should see the battery specification
    And I should see the charging specification
    And I should see the drivetrain specification
    And I should see the range specification
    And I should see the seats specification
    And I should see the condition specification
    And I should see the color specification

  @vehicle-details @positive
  Scenario: Verify vehicle information display
    And I navigate to a vehicle details page
    Then I should see the vehicle brand and model
    And I should see the vehicle year
    And I should see the vehicle location
    And I should see the vehicle price with proper currency formatting
    And I should see the vehicle information

  @vehicle-details @image-gallery @positive
  Scenario: Image gallery functionality
    And I navigate to a vehicle details page
    Then I should see the main vehicle image
    And I should see the image thumbnail gallery
    And the thumbnail images should be clickable

  @vehicle-details @image-gallery @positive
  Scenario: Navigate through image gallery using thumbnails
    And I navigate to a vehicle details page
    When I click on the second thumbnail image
    Then the main image should change to the selected image
    And the selected thumbnail should be highlighted
    When I click on the third thumbnail image
    Then the main image should change to the third image

  @vehicle-details @image-gallery @positive
  Scenario: Navigate through images using scroll buttons
    And I navigate to a vehicle details page
    When I click the right scroll button
    Then the thumbnail gallery should scroll to show more images
    When I click the left scroll button
    Then the thumbnail gallery should scroll back to show previous images

  @vehicle-details @specifications @positive
  Scenario: Verify all specification fields have values
    And I navigate to a vehicle details page
    Then all specification fields should display valid values
    And no specification field should be empty
    And the specifications should be properly formatted

  @vehicle-details @navigation @positive
  Scenario: Back to listings navigation
    And I navigate to a vehicle details page
    When I click Back to Listing button
    Then I should be redirected to the listings page
    And I should see the vehicle listings
    And the previous filters should be preserved

  @vehicle-details @navigation @positive
  Scenario: Back to listings maintains page state
    And I select "New" from the condition filter
    Then I should see only "New" vehicles in the results
    And I am on page 2 of the results
    When I navigate to a vehicle details page
    And I click Back to Listing button
    Then I should return to page 2 of the results
    And the condition filter should show "New" as selected

  @vehicle-details @url @positive
  Scenario: Direct access to vehicle details via URL
    When I navigate directly to a vehicle details URL
    Then I should see the vehicle information
    And the page should load all components properly
    And the image gallery should be functional

  @vehicle-details @responsive @positive
  Scenario: Vehicle details page on mobile devices
    And I navigate to a vehicle details page
    Given I am viewing the page on a mobile device
    Then the vehicle information should be mobile-friendly
    And I view the vehicle details page 
    And I should see the vehicle specifications section
    And the image gallery should work on touch devices

  @vehicle-details @integration @search-context
  Scenario: Vehicle details from search results
    When I enter "Tesla" in the search field
    And I click the search button
    And I navigate to a vehicle details page
    When I view the vehicle details page
    Then the vehicle should match search criteria "Tesla"
    And I should be able to return to search results

  @vehicle-details @integration @filter-context
  Scenario: Vehicle details from filtered results
    Given I select "Used" from the condition filter
    Then I should see only "Used" vehicles in the results
    And I navigate to a vehicle details page
    Then I should be on the vehicle details page
    When I view the vehicle details page
    Then the vehicle condition should be "Used"
    And I should be able to return to filtered results