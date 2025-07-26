export const vehicleDetailsLocators = {
    
    // Navigation elements
    navigationHeader: 'nav.w-full.p-4',
    backToListings: '[role="navigation"]',

    // Main container
    mainContainer: 'div.mt-6.max-w-5xl.mx-auto',
    contentGrid: 'div.mt-6.grid.gap-4',

    // Image gallery elements
    imageGalleryContainer: 'div.flex.flex-col.gap-6',
    mainImageContainer: 'div.relative.h-64.sm\\:h-96.w-full',
    mainImage: 'img[alt="EV Image"]',
    
    // Thumbnail gallery
    thumbnailGalleryContainer: 'div.relative',
    thumbnailScrollContainer: 'div.flex.overflow-x-auto.gap-4',
    thumbnailImage: 'div[role="button"][title="click to view image"] img',
    thumbnailImageByIndex: (index: number) => `div[role="button"]:nth-child(${index + 1}) img`,
    
    // Gallery navigation buttons
    leftScrollButton: 'button[aria-label="Scroll left"]',
    rightScrollButton: 'button[aria-label="Scroll right"]',
    scrollButton: 'button.absolute.text-white.font-extrabold',

    // Vehicle information
    vehicleInfoContainer: 'div.flex.w-full.items-start.justify-between',
    vehicleTitle: 'h2.text-2xl.font-semibold',
    vehicleBrand: 'h2.text-2xl.font-semibold', // Contains brand and model
    vehicleLocation: 'p.text-xl.font-medium.text-gray-500',
    vehiclePrice: 'p.text-3xl.font-bold.text-blue-600',

    // Specifications section
    specificationsContainer: 'div.p-6.rounded-lg.shadow',
    specificationsTitle: 'h2.text-xl.font-bold.mb-4',
    specificationsGrid: 'div.grid.grid-cols-2.sm\\:grid-cols-3.gap-4',
    specificationItem: 'div.flex.items-center.space-x-3',
    specificationLabel: 'span.text-gray-600',
    specificationValue: 'span.font-semibold',

    // Individual specifications
    batterySpec: 'div.flex-1:contains("Battery:")',
    chargingSpec: 'div.flex-1:contains("Charging:")',
    drivetrainSpec: 'div.flex-1:contains("Drivetrain:")',
    autopilotSpec: 'div.flex-1:contains("Autopilot:")',
    rangeSpec: 'div.flex-1:contains("Range:")',
    accidentsSpec: 'div.flex-1:contains("Accidents:")',
    seatsSpec: 'div.flex-1:contains("Seats:")',
    conditionSpec: 'div.flex-1:contains("Condition:")',
    colorSpec: 'div.flex-1:contains("Color:")',

    // Dynamic specification selectors
    getSpecByLabel: (label: string) => `div.flex-1:contains("${label}:")`,
    getSpecValueByLabel: (label: string) => `div.flex-1:contains("${label}:") span.font-semibold`,

    // Loading states
    loadingSpinner: '[data-testid="loading"]',
    imageLoadingPlaceholder: 'div.animate-pulse',

    // Error states
    errorMessage: '.error-message',
    notFoundMessage: '.not-found',
    brokenImagePlaceholder: 'img[src*="placeholder"]',

    // Responsive selectors
    mobileLayout: '@media (max-width: 640px)',
    tabletLayout: '@media (max-width: 1024px)',

    // Accessibility selectors
    skipLink: 'a.sr-only',
    landmarkMain: 'main',
    headingLevel1: 'h1',
    headingLevel2: 'h2',

    // SEO elements
    pageTitle: 'title',
    metaDescription: 'meta[name="description"]',
    ogTitle: 'meta[property="og:title"]',
    ogImage: 'meta[property="og:image"]',

    // Keyboard navigation
    focusableElements: 'a, button, img[role="button"], [tabindex]:not([tabindex="-1"])',
    
    // Alternative selectors for different states
    selectedThumbnail: 'div[role="button"].selected', // If you add selected state
    activeImage: 'img.active', // If you add active state
    disabledScrollButton: 'button:disabled',
    hiddenScrollButton: 'button.hidden',

    // Price formatting patterns
    pricePattern: /\d+[\.,]\d+[\.,]?\d*\s*[$€£¥]/,
    currencySymbol: /[$€£¥]/,

    // Data attributes (if you add them)
    vehicleId: '[data-vehicle-id]',
    imageIndex: '[data-image-index]',
    specType: '[data-spec-type]',

    // Form elements (if any)
    contactForm: 'form.contact-form',
    inquiryButton: 'button.inquiry-btn',

    // Social sharing (if added)
    shareButton: 'button.share-btn',
    socialLinks: '.social-share a',

    // Related vehicles (if added)
    relatedVehiclesSection: '.related-vehicles',
    relatedVehicleCard: '.related-vehicle-card',

    // Breadcrumbs (if added)
    breadcrumbContainer: 'nav.breadcrumb',
    breadcrumbLink: 'nav.breadcrumb a',
    breadcrumbCurrent: 'nav.breadcrumb .current'
};