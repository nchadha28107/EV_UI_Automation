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
    searchResultsSection: 'section.text-center',
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
}