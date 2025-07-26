export const vehicleDetailsLocators = {
    
    // Navigation elements
    navigationHeader: 'nav.w-full.p-4',
    backToListings: '[role="navigation"]',

    // Main container
    mainContainer: 'div.mt-6.max-w-5xl.mx-auto',

    // Image gallery elements
    mainImage: 'img[alt="EV Image"]',
    
    // Thumbnail gallery
    thumbnailGalleryContainer: 'div.relative',
    thumbnailScrollContainer: 'div.flex.overflow-x-auto.gap-4',
    thumbnailImage: 'div[role="button"][title="click to view image"] img',
    thumbnailImageByIndex: (index: number) => `div[role="button"]:nth-child(${index + 1}) img`,
    
    // Gallery navigation buttons
    leftScrollButton: 'button[aria-label="Scroll left"]',
    rightScrollButton: 'button[aria-label="Scroll right"]',

    // Vehicle information
    vehicleInfoContainer: 'div.flex.w-full.items-start.justify-between',
    vehicleTitle: 'h2.text-2xl.font-semibold',
    vehicleLocation: 'p.text-xl.font-medium.text-gray-500',
    vehiclePrice: 'p.text-3xl.font-bold.text-blue-600',

    // Specifications section
    specificationsContainer: 'div.p-6.rounded-lg.shadow',
    specificationsTitle: 'h2.text-xl.font-bold.mb-4',
    specificationsGrid: 'div.grid.grid-cols-2.sm\\:grid-cols-3.gap-4',
    specificationItem: 'div.flex.items-center.space-x-3',
    specificationLabel: 'span.text-gray-600',
    specificationValue: 'span.font-semibold',

    // Dynamic specification selectors
    getSpecByLabel: (label: string) => `div.flex-1:contains("${label}:")`,
    getSpecValueByLabel: (label: string) => `div.flex-1:contains("${label}:") span.font-semibold`,

    // Error states
    errorMessage: '.error-message',

    // Price formatting patterns
    pricePattern: /\d+[\.,]\d+[\.,]?\d*\s*[$€£¥]/,
};