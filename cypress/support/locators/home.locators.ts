export const homeLocators = {
    // Updated selectors based on your actual HTML structure
    searchForm: 'form.search-form',
    searchField: 'input[name="query"]',
    searchButton: 'button[type="submit"]:contains("Search")',
    clearButton: 'button:contains("Clear")',
    clearLink: 'a[href="/"]',
    searchSection: 'section.bg-indigo-800',
    searchTitle: 'h1',
    searchSubtitle: 'p',

    // Results section selectors (you'll need to update these based on your results page)
    searchResultsSection: 'div.p-6.max-w-full.mx-auto',
    searchResultsTitle: 'p.text-2xl',
    searchResultsContainer: 'div.p-6.max-w-full.mx-auto',
    searchResultNotFound: '.text-xl.py-6',
    evListingsHeader: 'h2.text-2xl.font-bold',
    searchResultsList: 'ul.mt-7.grid',
    searchResultItem: 'ul.mt-7.grid li',
    vehicleDetailsContainer: '.mt-6.max-w-5xl',
    vehicleImage: 'img[alt="EV Image"]',
    resultvehicleName: '.text-2xl',
    vehicleName: 'p.font-bold.text-lg',
    vehicleCondition: 'div.rounded-lg.self-center.text-sm.px-2',
    vehicleYear: 'div.flex.gap-1.text-slate-900 p:first-child',
    vehicleSeater: 'div.flex.gap-1.text-slate-900 p:nth-child(2)',
    vehicleColor: 'div.flex.gap-1.text-slate-900 p:last-child',
    vehiclePrice: 'p.font-medium.text-xl.text-black',
    detailsButton: 'button.rounded-xl',
    detailsLink: 'button a[href*="/ev/"]',
    highlightedSearchTerm: 'strong',

    // Filter and Sort selectors
    conditionFilter: 'select:first-of-type',
    sortFilter: 'select:last-of-type',

    // Pagination selectors
    paginationContainer: 'div.flex.justify-center.gap-1.mt-4',
    previousButton: 'button:contains("Previous")',
    nextButton: 'button:contains("Next")',
    pageInfo: 'p.bg-white.text-indigo-500',
    
    // Alternative pagination selectors (if your HTML structure is different)
    paginationWrapper: '[data-testid="pagination"]',
    pageNumbers: '.pagination-numbers',
    currentPageIndicator: '.current-page',
    totalPagesIndicator: '.total-pages',
    
    // Loading state selectors
    loadingSpinner: '[data-testid="loading"]',
    loadingOverlay: '.loading-overlay',
    
    // Error message selectors
    errorMessage: '.error-message',
    pageNotFound: '.page-not-found',
    
    // Accessibility selectors
    paginationNav: 'nav[aria-label="pagination"]',
    srOnlyText: '.sr-only',

    // Results section selectors - Updated based on your HTML structure
    // searchResultsList: 'ul.mt-7.grid.md\\:grid-cols-3.sm\\:grid-cols-2.gap-5',
    // searchResultItem: 'ul.mt-7.grid li.bg-white.border-\\[1px\\]',
    
    // Additional selectors that might be useful
    vehicleCard: 'li.bg-white.border-\\[1px\\].border-gray',
    vehicleImageContainer: 'div.relative.h-64.sm\\:h-64.w-full',
    vehicleNameAndCondition: 'div.py-2.flex.justify-between',
    vehicleDetails: 'div.flex.flex-col.gap-2.text-slate-500',
    vehicleSpecs: 'div.flex.gap-1.text-slate-900',
    vehiclePriceAndButton: 'div.flex.justify-between',
    
    // Filter container
    filtersContainer: 'div.flex.justify-between.mb-4 div.flex.gap-2',
    
}