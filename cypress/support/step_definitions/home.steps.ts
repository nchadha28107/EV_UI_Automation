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

Then('I can click the search button', () => {
    homePage.clickSearchButton();
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

Then('the search should be executed', () => {
    homePage.verifySearchExecuted();
});

Given('the page contains vehicle listings', () => {
  homePage.verifyListingsPageLoaded();
  homePage.verifyVehicleListingsExist();
});

// Filter condition steps
When('I select {string} from the condition filter', (condition: string) => {
  homePage.selectConditionFilter(condition);
});

When('I select {string} from the sort filter', (sortOption: string) => {
  homePage.selectSortFilter(sortOption);
});

// Result verification steps
Then('I should see only {string} vehicles in the results', (text: string) => {
  homePage.verifyAllResultsAreNewUsedVehicles(text);
});

Then('I should see all vehicles regardless of condition', () => {
  homePage.verifyResultsContainBothNewAndUsed();
});

// Filter state verification
Then('the condition filter should show {string} as selected', (expectedValue: string) => {
  homePage.verifyConditionFilterSelection(expectedValue);
});

Then('the sort filter should show {string} as selected', (expectedValue: string) => {
  homePage.verifySortFilterSelection(expectedValue);
});

// URL parameter verification
Then('the URL should be updated with the filter parameter', () => {
  homePage.verifyURLContainsFilterParameter();
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

Given('I have filtered by {string} condition and {string} sort', (condition: string, sort: string) => {
  homePage.selectConditionFilter(condition);
  homePage.selectSortFilter(sort);
  homePage.verifyConditionFilterSelection(condition);
  homePage.verifySortFilterSelection(sort);
});

Then('I should see only {string} vehicles sorted by price ascending', (text: string) => {
  homePage.verifyAllResultsAreNewUsedVehicles(text);
  homePage.verifyPriceSortingAscending();
});

// Filter options verification
When('I interact with the condition filter dropdown', () => {
  homePage.openConditionFilterDropdown();
});

When('I interact with the sort filter dropdown', () => {
  homePage.openSortFilterDropdown();
});

Then('I should see filter options: {string}, {string}, {string}', (option1: string, option2: string, option3: string) => {
  homePage.verifyConditionFilterOptions([option1, option2, option3]);
});

Then('I should see sorting options: {string}, {string}, {string}', (option1: string, option2: string, option3: string) => {
  homePage.verifySortFilterOptions([option1, option2, option3]);
});

Then('all filter options should be clickable', () => {
  homePage.verifyAllFilterOptionsClickable();
});

// Navigation and persistence
When('I navigate to a vehicle details page', () => {
  homePage.clickFirstVehicleDetailsLink();
});

When('I click Back to Listing button', () => {
  // cy.go('back');
  
  cy.intercept('GET', /\.*(?:page)=/).as('backkk');
  cy.get('[role="navigation"]').click();
  cy.wait('@backkk')
});

Then('the search term should be preserved', () => {
  homePage.verifySearchTermPreserved('tesla');
});

Then('both search and filter parameters should be in URL', () => {
  homePage.verifyURLContainsSearchAndFilterParameters();
});