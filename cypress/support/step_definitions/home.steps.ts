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

Then('the search term should be preserved', () => {
  homePage.verifySearchTermPreserved('tesla');
});

Then('both search and filter parameters should be in URL', () => {
  homePage.verifyURLContainsSearchAndFilterParameters();
});

Given('I am on page {int} of the results', (pageNumber: number) => {
  if (pageNumber > 1) {
    // Navigate to the specific page by clicking Next button (pageNumber-1) times
    for (let i = 1; i < pageNumber; i++) {
      homePage.clickNextButton();
    }
  }
  homePage.verifyCurrentPage(pageNumber);
});

Given('I am on page {int} of the filtered results', (pageNumber: number) => {
  if (pageNumber > 1) {
    for (let i = 1; i < pageNumber; i++) {
      homePage.clickNextButton();
    }
  }
  homePage.verifyCurrentPage(pageNumber);
});

Given('I am on page {int} of the combined results', (pageNumber: number) => {
  if (pageNumber > 1) {
    for (let i = 1; i < pageNumber; i++) {
      homePage.clickNextButton();
    }
  }
  homePage.verifyCurrentPage(pageNumber);
});

Given('I am on the last page of results', () => {
  homePage.navigateToLastPage();
});

// When steps for pagination actions
When('I click the Next button', () => {
  homePage.clickNextButton();
});

When('I click the Previous button', () => {
  homePage.clickPreviousButton();
});

When('I refresh the page', () => {
  cy.reload();
});

When('I click the browser back button', () => {
  cy.go('back');
        cy.window().should('have.property', 'document');
        cy.document().should('have.property', 'readyState', 'complete');

});

When('I navigate directly to page {int} via URL', (pageNumber: number) => {
  homePage.navigateToPageViaURL(pageNumber);
});

// Then steps for pagination verification
Then('I should see the pagination section', () => {
  homePage.verifyPaginationExists();
});

Then('I should see the page information display', () => {
  homePage.verifyPageInfoDisplay();
});

Then('I should see the Previous button', () => {
  homePage.verifyPreviousButtonExists();
});

Then('I should see the Next button', () => {
  homePage.verifyNextButtonExists();
});

Then('I should be on page {int} of the results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the URL should reflect the current page number', () => {
  homePage.verifyURLContainsPageParameter();
});

Then('the page information should show page {int}', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the Previous button should be enabled', () => {
  homePage.verifyPreviousButtonEnabled();
});

Then('the Previous button should be disabled', () => {
  homePage.verifyPreviousButtonDisabled();
});

Then('the Next button should be enabled', () => {
  homePage.verifyNextButtonEnabled();
});

Then('the Next button should be disabled', () => {
  homePage.verifyNextButtonDisabled();
});

Then('different vehicles should be displayed', () => {
  homePage.verifyDifferentVehiclesDisplayed();
});

Then('the page information should show the last page number', () => {
  homePage.verifyLastPageNumber();
});

Then('I should still be on page {int} of the results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the URL should contain {string}', (expectedParam: string) => {
  cy.url().should('include', expectedParam);
});

Then('I should be on page {int} of the filtered results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the URL should contain both filter and page parameters', () => {
  homePage.verifyURLContainsFilterParameter();
  homePage.verifyURLContainsPageParameter();
});

Then('I should be on page {int} of the search results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the URL should contain both search and page parameters', () => {
  homePage.verifyURLContainsSearchParameter();
  homePage.verifyURLContainsPageParameter();
});

Then('I should be on page {int} of the combined results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the URL should contain search, filter, sort, and page parameters', () => {
  homePage.verifyURLContainsSearchParameter();
  homePage.verifyURLContainsFilterParameter();
  homePage.verifyURLContainsSortParameter();
  homePage.verifyURLContainsPageParameter();
});

Then('the applied filters should remain active', () => {
  homePage.verifyFiltersRemainActive();
});

Then('I should be back on page {int} of the results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});

Then('the pagination section should not be displayed', () => {
  homePage.verifyPaginationNotDisplayed();
});

Then('I should return to page {int} of the results', (pageNumber: number) => {
  homePage.verifyCurrentPage(pageNumber);
});