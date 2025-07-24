import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { HomePage } from '../pages/home.page';

const homePage = new HomePage();

Given('I am on the EV application homepage', () => {
    homePage.launchURL();
});

Given('the search functionality is available', () => {
    homePage.verifySearchFieldExists();
    homePage.verifySearchButtonExists();
});

When('I click the clear button', () => {
    homePage.clickClearButton();
});

Then('the search button should be disabled', () => {
    homePage.verifySearchButtonDisabled();
});

Then('the search button should be enabled', () => {
    homePage.verifySearchButtonEnabled();
});

Then('I can click the search button', () => {
    homePage.clickSearchButton();
});

Then('I should see search field validation message', () => {
    homePage.verifySearchFieldValidationMessage();
});

Then('I should be redirected to the homepage', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Then('the search field should be empty', () => {
    homePage.verifySearchFieldEmpty();
});

// // Background Steps
// Given('I am on the EV application homepage', () => {
//     cy.visit('/');
//     cy.url().should('include', Cypress.config().baseUrl);
// });

Given('the search section displays correctly', () => {
    homePage.verifySearchSectionStructure();
});

// When Steps - Actions
When('I enter {string} in the search field', (searchTerm: string) => {
    homePage.enterSearchTerm(searchTerm);
});

When('I click the search button', () => {
    homePage.clickSearchButton();
});

When('I leave the search field empty', () => {
    homePage.clearSearchField();
});

When('I clear the search field', () => {
    homePage.clearSearchField();
});

When('I press Enter key', () => {
    homePage.pressEnterInSearchField();
});

When('I click on a search result', () => {
    homePage.clickFirstSearchResult();
});

// Then Steps - Assertions
Then('I should see search results containing {string}', (expectedText: string) => {
    homePage.verifySearchResultsContain(expectedText);
});

Then('the results should be displayed in a grid format', () => {
    homePage.verifyResultsDisplayFormat();
});

Then('each result should contain vehicle information', () => {
    homePage.verifyEachResultContainsVehicleInfo();
});

Then('the search term should be highlighted in the results', () => {
    homePage.verifySearchTermHighlighting();
});

Then('I should see no result found message', () => {
    homePage.verifyMessage();
});

Then('I should see all available vehicles', () => {
    homePage.verifyAllVehiclesDisplayed();
});

Then('I should be navigated to the vehicle details page', () => {
    homePage.verifyNavigationToDetailsPage();
});

Then('the vehicle details should match the selected result', () => {
    homePage.verifyDetailsMatchSelectedResult();
});

Then('the search results should be cleared', () => {
    homePage.verifySearchResultsCleared();
});

Then('I should return to the default view', () => {
    homePage.verifyDefaultViewReturned();
});

Then('the search should be executed', () => {
    homePage.verifySearchExecuted();
});

Given('the page contains vehicle listings', () => {
  homePage.verifyListingsPageLoaded();
  homePage.verifyVehicleListingsExist();
});

// Filter condition steps
When('I select {string} from the condition filter', (condition) => {
  homePage.selectConditionFilter(condition);
});

When('I select {string} from the sort filter', (sortOption) => {
  homePage.selectSortFilter(sortOption);
});

// Result verification steps
Then('I should see only new vehicles in the results', () => {
  homePage.verifyAllResultsAreNewVehicles();
});

Then('I should see only used vehicles in the results', () => {
  homePage.verifyAllResultsAreUsedVehicles();
});

Then('I should see all vehicles regardless of condition', () => {
  homePage.verifyResultsContainBothNewAndUsed();
});

// Filter state verification
Then('the condition filter should show {string} as selected', (expectedValue) => {
  homePage.verifyConditionFilterSelection(expectedValue);
});

Then('the sort filter should show {string} as selected', (expectedValue) => {
  homePage.verifySortFilterSelection(expectedValue);
});

// URL parameter verification
Then('the URL should be updated with the condition parameter', () => {
  homePage.verifyURLContainsConditionParameter();
});

Then('the URL should be updated with the sort parameter', () => {
  homePage.verifyURLContainsSortParameter();
});

Then('the URL should not contain condition parameter', () => {
  homePage.verifyURLDoesNotContainConditionParameter();
});

Then('the URL should not contain sort parameter', () => {
  homePage.verifyURLDoesNotContainSortParameter();
});

Then('the URL should contain both condition and sort parameters', () => {
  homePage.verifyURLContainsBothParameters();
});

Then('the URL should reflect the new filter combination', () => {
  homePage.verifyURLContainsBothParameters();
});

// Sorting verification steps
Then('the vehicles should be sorted by price in ascending order', () => {
  homePage.verifyPriceSortingAscending();
});

Then('the vehicles should be sorted by price in descending order', () => {
  homePage.verifyPriceSortingDescending();
});

Then('the vehicles should be displayed in default order', () => {
  homePage.verifyDefaultSorting();
});

// Combined filter steps
Given('I have applied a condition filter', () => {
  homePage.selectConditionFilter('New');
  homePage.verifyConditionFilterSelection('New');
});

Given('I have applied a sort filter', () => {
  homePage.selectSortFilter('Low to High');
  homePage.verifySortFilterSelection('Low to High');
});

Given('I have filtered by {string} condition and {string} sort', (condition, sort) => {
  homePage.selectConditionFilter(condition);
  homePage.selectSortFilter(sort);
  homePage.verifyConditionFilterSelection(condition);
  homePage.verifySortFilterSelection(sort);
});

Then('I should see only new vehicles sorted by price ascending', () => {
  homePage.verifyAllResultsAreNewVehicles();
  homePage.verifyPriceSortingAscending();
});

Then('I should see only new vehicles sorted by price ascending', () => {
  homePage.verifyAllResultsAreNewVehicles();
  homePage.verifyPriceSortingAscending();
});

Then('both filters should retain their selected values', () => {
  homePage.verifyConditionFilterSelection('New');
  homePage.verifySortFilterSelection('Low to High');
});

Then('the previous filter selections should be updated', () => {
  homePage.verifyConditionFilterSelection('New');
  homePage.verifySortFilterSelection('Low to High');
});

// Edge cases and error handling
Given('there are no new vehicles available', () => {
  // This might need to be mocked or use test data
  homePage.setupNoNewVehiclesScenario();
});

Then('I should see a {string} message', (messageType) => {
  if (messageType === 'no results found') {
    homePage.verifyNoResultsMessage();
  }
});

Then('the condition filter should remain as {string}', (expectedValue) => {
  homePage.verifyConditionFilterSelection(expectedValue);
});

Then('the page should handle empty results gracefully', () => {
  homePage.verifyEmptyResultsHandling();
});

// Filter options verification
When('I interact with the condition filter dropdown', () => {
  homePage.openConditionFilterDropdown();
});

When('I interact with the sort filter dropdown', () => {
  homePage.openSortFilterDropdown();
});

Then('I should see options: {string}, {string}, {string}', (option1, option2, option3) => {
  homePage.verifyConditionFilterOptions([option1, option2, option3]);
});

Then('I should see options: {string}, {string}, {string}', (option1, option2, option3) => {
  homePage.verifySortFilterOptions([option1, option2, option3]);
});

Then('all filter options should be clickable', () => {
  homePage.verifyAllFilterOptionsClickable();
});

// Navigation and persistence
When('I navigate to a vehicle details page', () => {
  homePage.clickFirstVehicleDetailsLink();
});

When('I return to the listings page using browser back', () => {
  cy.go('back');
});

Then('the applied filters should be maintained', () => {
  homePage.verifyConditionFilterSelection('Used');
  homePage.verifySortFilterSelection('Low to High');
});

Then('the filtered results should be displayed correctly', () => {
  homePage.verifyAllResultsAreUsedVehicles();
  homePage.verifyPriceSortingAscending();
});

// Performance testing
Then('the results should update within {int} seconds', (seconds) => {
  homePage.verifyFilterResponseTime(seconds * 1000);
});

Then('the page should remain responsive during filtering', () => {
  homePage.verifyPageResponsiveness();
});

// Accessibility testing
Then('the condition filter should have proper aria-label', () => {
  homePage.verifyConditionFilterAccessibility();
});

Then('the sort filter should have proper aria-label', () => {
  homePage.verifySortFilterAccessibility();
});

Then('filters should be keyboard navigable', () => {
  homePage.verifyFiltersKeyboardNavigation();
});

Then('filter changes should be announced to screen readers', () => {
  homePage.verifyFilterChangesAnnouncement();
});

// Search integration
Given('I have searched for {string}', (searchTerm) => {
  homePage.performSearch(searchTerm);
  homePage.verifySearchResults(searchTerm);
});

Then('I should see only new Tesla vehicles', () => {
  homePage.verifySearchResultsContain('tesla');
  homePage.verifyAllResultsAreNewVehicles();
});

Then('the search term should be preserved', () => {
  homePage.verifySearchTermPreserved('tesla');
});

Then('both search and filter parameters should be in URL', () => {
  homePage.verifyURLContainsSearchAndFilterParameters();
});

// UI validation
Then('the condition filter should display with default {string} selected', (defaultValue) => {
  homePage.verifyConditionFilterSelection(defaultValue);
});

Then('the sort filter should display with default {string} selected', (defaultValue) => {
  homePage.verifySortFilterSelection(defaultValue);
});

Then('both filters should have consistent styling', () => {
  homePage.verifyFilterStylingConsistency();
});

Then('filters should be positioned correctly in the header section', () => {
  homePage.verifyFilterPositioning();
});