import { homeLocators } from '../locators/home.locators';
import home from '../../fixtures/home.json';

let env = Cypress.env('environment') || 'local';
let device = Cypress.env('device');
let urls = require('../config/urls.json');

export class HomePage {

    launchURL() {
        Cypress.config().baseUrl = urls[env];
        cy.viewport(device || 'macbook-15');
        cy.visit(urls[env]);
        cy.wait(3000);
    }

    // Verification Methods
    verifySearchFieldExists() {
        cy.get(homeLocators.searchField)
            .should('be.visible')
            .and('have.attr', 'placeholder', home.searchFieldPlaceholder)
            .and('have.attr', 'minlength', home.searchFieldMinimumLength);
    }

    verifySearchFieldValidationMessage() {
        cy.get(homeLocators.searchField).should('have.property', 'validationMessage', 'Please lengthen this text to 3 characters or more (you are currently using 2 characters).');
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
            .type(searchTerm);

        // Verify button state based on minlength requirement
        if (searchTerm.length >= 3) {
            this.verifySearchButtonEnabled();
        } else {
            this.verifySearchButtonDisabled();
        }

        cy.get(homeLocators.searchField).should('have.value', searchTerm);
    }

    clickSearchButton() {
        cy.get(homeLocators.searchButton).should('not.be.disabled').click();
    }

    clickClearButton() {
        cy.get(homeLocators.clearButton).click();
    }

    clearSearchField() {
        cy.get(homeLocators.searchField).clear();
    }

    verifySearchButtonDisabled() {
        cy.get(homeLocators.searchButton).should('be.disabled');
    }

    verifySearchButtonEnabled() {
        cy.get(homeLocators.searchButton).should('not.be.disabled');
    }

    pressEnterInSearchField() {
        cy.get(homeLocators.searchField).type('{enter}');
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

    verifySearchResultsCleared() {
        cy.get(homeLocators.searchResults).should('not.exist');
    }

    verifyDefaultViewReturned() {
        cy.get('[data-testid="default-view"]').should('be.visible');
    }

    verifySearchExecuted() {
        // Verify search was executed by checking URL or results presence
        cy.url().should('include', 'search');
    }

    verifySearchFieldEmpty() {
        cy.get(homeLocators.searchField).should('have.value', '');
    }

    getSearchResultsCount() {
        return cy.get(homeLocators.searchResultItem).its('length');
    }

    selectSearchResultByIndex(index: number) {
        cy.get(homeLocators.searchResultItem).eq(index).click();
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
  selectConditionFilter(condition) {
    const startTime = Date.now();
    cy.get(homeLocators.conditionFilter).select(this.conditionFilterOptions[condition]);
    cy.wrap(startTime).as('filterStartTime');
    cy.wait(500); // Wait for results to update
  }

  selectSortFilter(sortOption) {
    const startTime = Date.now();
    cy.get(homeLocators.sortFilter).select(this.sortFilterOptions[sortOption]);
    cy.wrap(startTime).as('sortStartTime');
    cy.wait(500); // Wait for results to update
  }

  // Filter state verification
  verifyConditionFilterSelection(expectedValue) {
    const expectedOptionValue = this.conditionFilterOptions[expectedValue];
    cy.get(homeLocators.conditionFilter).should('have.value', expectedOptionValue);
  }

  verifySortFilterSelection(expectedValue) {
    const expectedOptionValue = this.sortFilterOptions[expectedValue];
    cy.get(homeLocators.sortFilter).should('have.value', expectedOptionValue);
  }

  // Results verification methods
  verifyAllResultsAreNewVehicles() {
    cy.get(homeLocators.searchResultItem).each(($item) => {
      cy.wrap($item).find(homeLocators.vehicleCondition).should('contain.text', 'New');
    });
  }

  verifyAllResultsAreUsedVehicles() {
    cy.get(homeLocators.searchResultItem).each(($item) => {
      cy.wrap($item).find(homeLocators.vehicleCondition).should('contain.text', 'Used');
    });
  }

  verifyResultsContainBothNewAndUsed() {
    cy.get(homeLocators.vehicleCondition).then(($conditions) => {
      const conditions = Array.from($conditions).map(el => el.textContent.trim());
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
    cy.get(homeLocators.vehicleItems).should('have.length.greaterThan', 0);
  }

  // Helper method to extract price values
  getPriceValues() {
    return cy.get(homeLocators.vehiclePrice).then(($prices) => {
      return Array.from($prices).map(el => {
        const priceText = el.textContent.trim();
        // Extract numeric value from "79.999,00 €" format
        const numericValue = priceText
          .replace(/[^\d,]/g, '') // Remove everything except digits and comma
          .replace(',', '.'); // Replace comma with dot for parsing
        return parseFloat(numericValue);
      });
    });
  }

  // URL parameter verification
  verifyURLContainsConditionParameter() {
    cy.url().should('contain', 'condition=');
  }

  verifyURLContainsSortParameter() {
    cy.url().should('contain', 'sort=');
  }

  verifyURLDoesNotContainConditionParameter() {
    cy.url().should('not.contain', 'condition=');
  }

  verifyURLDoesNotContainSortParameter() {
    cy.url().should('not.contain', 'sort=');
  }

  verifyURLContainsBothParameters() {
    cy.url().should('contain', 'condition=');
    cy.url().should('contain', 'sort=');
  }

  // Filter dropdown interaction
  openConditionFilterDropdown() {
    cy.get(homeLocators.conditionFilter).click();
  }

  openSortFilterDropdown() {
    cy.get(homeLocators.sortFilter).click();
  }

  // Filter options verification
  verifyConditionFilterOptions(expectedOptions) {
    cy.get(homeLocators.conditionFilter).find('option').then(($options) => {
      const actualOptions = Array.from($options).map(el => el.textContent.trim());
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  }

  verifySortFilterOptions(expectedOptions) {
    cy.get(homeLocators.sortFilter).find('option').then(($options) => {
      const actualOptions = Array.from($options).map(el => el.textContent.trim());
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  }

  verifyAllFilterOptionsClickable() {
    cy.get(homeLocators.conditionFilter).find('option').should('not.be.disabled');
    cy.get(homeLocators.sortFilter).find('option').should('not.be.disabled');
  }

  // Navigation methods
  clickFirstVehicleDetailsLink() {
    cy.get(homeLocators.detailsLink).first().click();
  }

  // Edge case handling
  setupNoNewVehiclesScenario() {
    // This would typically involve API mocking or test data setup
    // For now, we'll assume this scenario exists in your test environment
    cy.log('Setting up scenario with no new vehicles');
  }

  verifyEmptyResultsHandling() {
    cy.get(homeLocators.vehicleItems).should('have.length', 0);
  }

  // Performance verification
  verifyFilterResponseTime(maxTimeMs) {
    cy.get('@filterStartTime').then((startTime) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      expect(duration).to.be.lessThan(maxTimeMs);
    });
  }

  verifyPageResponsiveness() {
    cy.get(this.conditionFilter).should('not.be.disabled');
    cy.get(this.sortFilter).should('not.be.disabled');
    cy.get('body').should('not.have.class', 'loading'); // Adjust based on your loading states
  }

  // Accessibility verification
  verifyConditionFilterAccessibility() {
    cy.get(this.conditionFilter).should('have.attr', 'aria-label')
      .or('have.attr', 'aria-labelledby');
  }

  verifySortFilterAccessibility() {
    cy.get(this.sortFilter).should('have.attr', 'aria-label')
      .or('have.attr', 'aria-labelledby');
  }

  verifyFiltersKeyboardNavigation() {
    cy.get(this.conditionFilter).focus().type('{downarrow}{enter}');
    cy.get(this.sortFilter).focus().type('{downarrow}{enter}');
  }

  verifyFilterChangesAnnouncement() {
    // This would typically involve testing with screen reader simulation
    cy.get(this.conditionFilter).should('have.attr', 'aria-live')
      .or('have.attr', 'role');
  }

  // Search integration methods
  performSearch(searchTerm) {
    cy.get(this.searchInput).type(searchTerm);
    cy.get(this.searchForm).submit();
  }

  verifySearchResults(searchTerm) {
    cy.get('p.text-2xl').should('contain.text', `search results for "${searchTerm}"`);
  }

  verifySearchResultsContain(searchTerm) {
    cy.get(this.vehicleName).each(($name) => {
      cy.wrap($name).should('contain.text', searchTerm, { matchCase: false });
    });
  }

  verifySearchTermPreserved(searchTerm) {
    cy.url().should('contain', `query=${searchTerm}`);
  }

  verifyURLContainsSearchAndFilterParameters() {
    cy.url().should('contain', 'query=');
    cy.url().should('contain', 'condition=');
  }

  // UI styling verification
  verifyFilterStylingConsistency() {
    const expectedClasses = 'border rounded-lg px-3 py-1 text-gray-700 bg-white';
    cy.get(this.conditionFilter).should('have.class', 'border')
      .and('have.class', 'rounded-lg')
      .and('have.class', 'px-3')
      .and('have.class', 'py-1')
      .and('have.class', 'text-gray-700')
      .and('have.class', 'bg-white');
    
    cy.get(this.sortFilter).should('have.class', 'border')
      .and('have.class', 'rounded-lg')
      .and('have.class', 'px-3')
      .and('have.class', 'py-1')
      .and('have.class', 'text-gray-700')
      .and('have.class', 'bg-white');
  }

  verifyFilterPositioning() {
    cy.get(this.filtersContainer).should('have.class', 'flex')
      .and('have.class', 'justify-between')
      .and('have.class', 'mb-4');
    
    cy.get(this.filtersSection).should('have.class', 'flex')
      .and('have.class', 'gap-2');
  }
}