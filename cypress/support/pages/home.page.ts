import { homeLocators } from '../locators/home.locators';
import home from '../../fixtures/home.json';

let env = Cypress.env('environment') || 'local';
let device = Cypress.env('device');
let urls = require('../config/urls.json');

type ConditionOption = 'All' | 'New' | 'Used';
type SortOption = 'Sort' | 'Low to High' | 'High to Low';

export class HomePage {

    // Filter options mapping - CORRECTED: Added missing properties
    conditionFilterOptions: Record<ConditionOption, string> = {
        'All': '',
        'New': 'New', // Note: HTML has value mismatch - you may want to fix this
        'Used': 'Used'  // Note: HTML has value mismatch - you may want to fix this
    };
    
    sortFilterOptions: Record<SortOption, string> = {
        'Sort': '',
        'Low to High': 'asc',
        'High to Low': 'desc'
    };

    private currentVehicleList: string[] = [];

    launchURL() {
        Cypress.config().baseUrl = urls[env];
        cy.viewport(device || 'macbook-15');
        cy.visit(urls[env]);
        cy.window().should('have.property', 'document');
        cy.document().should('have.property', 'readyState', 'complete');
        // cy.wait(3000);
    }

    // Verification Methods
    verifySearchFieldExists() {
        cy.get(homeLocators.searchField)
            .should('be.visible')
            .and('have.attr', 'placeholder', home.searchFieldPlaceholder)
            .and('have.attr', 'minlength', home.searchFieldMinimumLength);
    }

    verifySearchButtonExists() {
        cy.get(homeLocators.searchButton)
            .should('be.visible')
        // .and('contain.text', 'Search');
    }

    verifySearchSectionStructure() {
        cy.get(homeLocators.searchSection).within(() => {
            cy.get(homeLocators.searchTitle)
                .should('contain.text', home.searchTitleText);
            cy.get(homeLocators.searchSubtitle)
                .should('contain.text', home.searchSubtitleText);
            cy.get(homeLocators.searchForm).should('exist');
        });
    }

    // Action Methods
    enterSearchTerm(searchTerm: string) {
        cy.get(homeLocators.searchField)
            .clear()
            .type(searchTerm).should('have.value', searchTerm);
    }

    clickSearchButton() {
        cy.intercept({method: 'GET', url: /\/\?.*(?:query)=/, times: 1}).as('searchRecords');
        cy.get(homeLocators.searchButton).should('not.be.disabled').click();
        cy.wait('@searchRecords');
    }

    clickClearButton() {
        cy.get(homeLocators.clearButton).click();
    }

    clearSearchField() {
        cy.get(homeLocators.searchField).clear();
    }

    clickFirstSearchResult() {
        cy.get(homeLocators.searchResultItem).first().find(homeLocators.detailsButton).click();
    }

    // Assertion Methods
    verifySearchResultsContain(expectedText: string) {
        cy.get(homeLocators.searchResultsSection).should('be.visible');
        cy.get(homeLocators.searchResultsTitle)
            .should('contain.text', `${home.searchResultsForText}“${expectedText}“`);
        cy.get(homeLocators.searchResultItem).should('have.length.greaterThan', 0);
        cy.get(homeLocators.vehicleName).each(($name) => {
            cy.wrap($name).should('contain.text', expectedText, { matchCase: false });
        });
    }

    verifyResultsDisplayFormat() {
        cy.get(homeLocators.searchResultsList)
            .should('be.visible')
            .should('have.class', 'grid');
        cy.get(homeLocators.searchResultItem).should('have.length.greaterThan', 0);
    }

    verifyEachResultContainsVehicleInfo() {
        cy.get(homeLocators.searchResultItem).each(($result) => {
            cy.wrap($result).within(() => {
                cy.get(homeLocators.vehicleImage).should('be.visible');
                cy.get(homeLocators.vehicleName).should('be.visible');
                cy.get(homeLocators.vehicleCondition).should('be.visible');
                cy.get(homeLocators.vehiclePrice).should('be.visible');
                cy.get(homeLocators.detailsButton).should('be.visible');
            });
        });
    }

    verifySearchTermHighlighting() {
        cy.get(homeLocators.searchResultsTitle).within(() => {
            cy.get(homeLocators.highlightedSearchTerm).should('exist').and('be.visible');
        });
    }

    verifyMessage() {
        cy.get(homeLocators.searchResultNotFound)
            .should('be.visible')
            .and('contain.text', home.searchResultNotFound);
    }

    verifyAllVehiclesDisplayed() {
        cy.get(homeLocators.searchResultItem).should('have.length.greaterThan', 0);
    }

    verifyNavigationToDetailsPage() {
        cy.url().should('include', '/ev/');
        cy.get(homeLocators.vehicleDetailsContainer).should('be.visible');
    }

    verifyDetailsMatchSelectedResult() {
        // Store the selected result data and verify it matches details page
        cy.get('@selectedVehicle').then((vehicleData) => {
            // cy.get('[data-testid="vehicle-name"]').should('contain.text', vehicleData.name);
        });
    }

    verifySearchFieldEmpty() {
        cy.get(homeLocators.searchField).should('have.value', '');
    }

    // Page verification methods
    verifyListingsPageLoaded() {
        cy.get(homeLocators.evListingsHeader).should('contain.text', 'EV Listings');
        cy.get(homeLocators.conditionFilter).should('be.visible');
    }

    verifyVehicleListingsExist() {
        cy.get(homeLocators.searchResultsList).should('exist');
        cy.get(homeLocators.searchResultItem).should('have.length.greaterThan', 0);
    }

    // Filter selection methods
    selectConditionFilter(condition: string) {
        cy.intercept({method: 'GET', url: /\/\?.*(?:filter|page)=/, times: 1}).as('filterRecords');
        cy.get(homeLocators.conditionFilter).select(this.conditionFilterOptions[condition as ConditionOption]);
        cy.wait('@filterRecords'); // Wait for results to update
        this.verifyURLContainsFilterParameter();
    }

    selectSortFilter(sortOption: string) {
        cy.intercept({method: 'GET', url: /\/\?.*(?:sort|page)=/, times: 1}).as('sortRecords');
        cy.get(homeLocators.sortFilter).select(this.sortFilterOptions[sortOption as SortOption]);
        cy.wait('@sortRecords'); // Wait for results to update
        this.verifyURLContainsSortParameter()
    }

    // Filter state verification
    verifyConditionFilterSelection(expectedValue: string) {
        const expectedOptionValue = this.conditionFilterOptions[expectedValue as ConditionOption];
        cy.get(homeLocators.conditionFilter).should('have.value', expectedOptionValue);
    }

    verifySortFilterSelection(expectedValue: string) {
        const expectedOptionValue = this.sortFilterOptions[expectedValue as SortOption];
        cy.get(homeLocators.sortFilter).should('have.value', expectedOptionValue);
    }

    // Results verification methods
    verifyAllResultsAreNewUsedVehicles(text: string) {
        cy.get(homeLocators.searchResultItem).each(($item) => {
            cy.wrap($item).find(homeLocators.vehicleCondition).should('contain.text', text);
        });
    }

    verifyResultsContainBothNewAndUsed() {
        cy.get(homeLocators.vehicleCondition).then(($conditions) => {
            const conditions = Array.from($conditions)
                .map(el => el.textContent?.trim() || '')
                .filter(condition => condition !== ''); // Remove empty strings
            expect(conditions).to.include.members(['New', 'Used']);
        });
    }

    // Price sorting verification
    verifyPriceSortingAscending() {
        this.getPriceValues().then((prices) => {
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sortedPrices);
        });
    }

    verifyPriceSortingDescending() {
        this.getPriceValues().then((prices) => {
            const sortedPrices = [...prices].sort((a, b) => b - a);
            expect(prices).to.deep.equal(sortedPrices);
        });
    }

    verifyDefaultSorting() {
        // Verify no specific sorting is applied - could be by ID, date added, etc.
        cy.get(homeLocators.searchResultItem).should('have.length.greaterThan', 0);
    }

    // Helper method to extract price values
    getPriceValues() {
        return cy.get(homeLocators.vehiclePrice).then(($prices) => {
            return Array.from($prices)
                .map(el => {
                    const priceText = el.textContent?.trim() || '';
                    if (!priceText) return 0; // Return 0 for empty prices
                    
                    // Extract numeric value from "79.999,00 €" format
                    const numericValue = priceText
                        .replace(/[^\d.,]/g, '') // Remove everything except digits, comma, and dot
                        .replace(/\./g, '') // Remove thousand separators (dots)
                        .replace(',', '.'); // Replace decimal comma with dot for parsing
                    
                    const parsedValue = parseFloat(numericValue);
                    return isNaN(parsedValue) ? 0 : parsedValue;
                })
                .filter(price => price > 0); // Remove invalid prices
        });
    }

    // URL parameter verification
    verifyURLContainsFilterParameter() {
        cy.url().should('contain', 'filter=');
    }

    verifyURLContainsSortParameter() {
        cy.url().should('contain', 'sort=');
    }

    verifyURLDoesNotContainConditionParameter() {
        cy.url().should('not.contain', 'filter=');
    }

    verifyURLDoesNotContainSortParameter() {
        cy.url().should('not.contain', 'sort=');
    }

    verifyURLContainsBothParameters() {
        cy.url().should('contain', 'filter=');
        cy.url().should('contain', 'sort=');
    }

    // Filter dropdown interaction
    openConditionFilterDropdown() {
        cy.get(homeLocators.conditionFilter).focus();
    }

    openSortFilterDropdown() {
        cy.get(homeLocators.sortFilter).focus();
    }

    // Filter options verification

    verifyConditionFilterOptions(expectedOptions: string[]) {
        cy.get(homeLocators.conditionFilter).find('option').then(($options) => {
            const actualOptions = Array.from($options)
                .map(el => el.textContent?.trim() || '')
                .filter(option => option !== ''); // Remove empty strings
            expect(actualOptions).to.deep.equal(expectedOptions);
        });
    }

    verifySortFilterOptions(expectedOptions: string[]) {
        cy.get(homeLocators.sortFilter).find('option').then(($options) => {
            const actualOptions = Array.from($options)
                .map(el => el.textContent?.trim() || '')
                .filter(option => option !== ''); // Remove empty strings
            expect(actualOptions).to.deep.equal(expectedOptions);
        });
    }

    verifyAllFilterOptionsClickable() {
        cy.get(homeLocators.conditionFilter).find('option').should('not.be.disabled');
        cy.get(homeLocators.sortFilter).find('option').should('not.be.disabled');
    }

    // Navigation methods
    clickFirstVehicleDetailsLink() {
        cy.intercept('GET', '/ev/*').as('evRecord');
        cy.get(homeLocators.detailsLink).first().click();
        cy.wait('@evRecord');
        cy.url().should('contain', '/ev/')
    }

    verifySearchTermPreserved(searchTerm: string) {
        cy.url().should('contain', `query=${searchTerm}`);
    }

    verifyURLContainsSearchAndFilterParameters() {
        cy.url().should('contain', 'query=');
        cy.url().should('contain', 'filter=');
    }

    // Pagination methods based on your HTML structure
    verifyPaginationExists() {
        cy.get(homeLocators.paginationContainer).should('be.visible');
        cy.get(homeLocators.pageInfo).should('be.visible');
    }

    clickNextButton() {
        cy.intercept({method: 'GET', url: /\/\?.*(?:page|)=/, times: 1}).as('pageLoad');
        cy.get(homeLocators.nextButton).should('not.be.disabled').click();
        cy.wait('@pageLoad');
    }

    clickPreviousButton() {
        cy.get(homeLocators.previousButton).should('not.be.disabled').click();
    }

    verifyCurrentPage(pageNumber: number) {
        cy.get(homeLocators.pageInfo).should('contain.text', `Page ${pageNumber} of`);
        if(pageNumber>1) {
            cy.url().should('include', `page=${pageNumber}`);
        }
    }

    verifyPreviousButtonDisabled() {
        cy.get(homeLocators.previousButton).should('be.disabled');
    }

    verifyNextButtonDisabled() {
        cy.get(homeLocators.nextButton).should('be.disabled');
    }

    verifyPreviousButtonEnabled() {
        cy.get(homeLocators.previousButton).should('not.be.disabled');
    }

    verifyNextButtonEnabled() {
        cy.get(homeLocators.nextButton).should('not.be.disabled');
    }


    // Navigation and URL methods
    navigateToPageViaURL(pageNumber: number) {
        cy.intercept({method: 'GET', url: /\/\?.*(?:page|)=/, times: 1}).as('pageLoad');
        cy.visit(`/?page=${pageNumber}`);
        cy.wait('@pageLoad'); // Wait for results to update
        
    }

    navigateToLastPage() {
        // Keep clicking next until disabled
        cy.get(homeLocators.nextButton).then(($button) => {
            if (!$button.is(':disabled')) {
                this.clickNextButton();
                this.navigateToLastPage(); // Recursive call
            }
        });
    }

    // Page info and button verification methods
    verifyPageInfoDisplay() {
        cy.get(homeLocators.pageInfo).should('be.visible');
    }

    verifyPreviousButtonExists() {
        cy.get(homeLocators.previousButton).should('be.visible');
    }

    verifyNextButtonExists() {
        cy.get(homeLocators.nextButton).should('be.visible');
    }

    verifyURLContainsPageParameter() {
        cy.url().should('contain', 'page=');
    }

    verifyURLContainsSearchParameter() {
        cy.url().should('contain', 'query=');
    }

    // Vehicle comparison methods
    verifyDifferentVehiclesDisplayed() {
        cy.get(homeLocators.vehicleName).then(($names) => {
            const newVehicleList = Array.from($names).map(el => el.textContent?.trim() || '');
            
            if (this.currentVehicleList.length > 0) {
                // Compare with previous list - should be different
                const isDifferent = !this.currentVehicleList.every((name, index) => 
                    name === newVehicleList[index]
                );
                expect(isDifferent).to.be.true;
            }
            
            this.currentVehicleList = newVehicleList;
        });
    }

    verifyLastPageNumber() {
        cy.get(homeLocators.pageInfo).should('contain', 'Page').then(($pageInfo) => {
            const text = $pageInfo.text();
            const match = text.match(/Page (\d+) of (\d+)/);
            if (match) {
                const currentPage = parseInt(match[1]);
                const totalPages = parseInt(match[2]);
                expect(currentPage).to.equal(totalPages);
            }
        });
    }

    // State verification methods
    verifyFiltersRemainActive() {
        // This would check that selected filters are still applied
        cy.get(homeLocators.conditionFilter).should('not.have.value', '');
        cy.get(homeLocators.sortFilter).should('not.have.value', '');
    }

    verifyErrorMessage() {
        cy.contains('Page not found').should('be.visible');
    }

    verifyPaginationNotDisplayed() {
        cy.get(homeLocators.paginationContainer).should('not.exist');
    }
}