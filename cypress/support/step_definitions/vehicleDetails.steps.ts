import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { VehicleDetailsPage } from '../pages/vehicleDetails.page';
import { HomePage } from '../pages/home.page';

const homePage = new HomePage();
const vehicleDetailsPage = new VehicleDetailsPage();

// Given Steps - Page Navigation
Given('I am on the vehicle details page', () => {
    vehicleDetailsPage.verifyOnVehicleDetailsPage();
});

Given('I am viewing the page on a mobile device', () => {
    cy.viewport('iphone-x');
});

When('I click Back to Listing button', (filterValue: string) => {
    vehicleDetailsPage.clickBackToListings();
});

When('I navigate directly to a vehicle details URL', () => {
    vehicleDetailsPage.navigateToVehicleDetailsViaURL('1'); // Default vehicle ID
});

When('I click on the second thumbnail image', () => {
    vehicleDetailsPage.storeCurrentMainImageSrc();
    vehicleDetailsPage.clickSecondThumbnail();
});

When('I click on the third thumbnail image', () => {
    vehicleDetailsPage.storeCurrentMainImageSrc();
    vehicleDetailsPage.clickThirdThumbnail();
});

When('I click the right scroll button', () => {
    vehicleDetailsPage.clickRightScrollButton();
});

When('I click the left scroll button', () => {
    vehicleDetailsPage.clickLeftScrollButton();
});

When('I view the vehicle details page', () => {
    vehicleDetailsPage.verifyPageLoaded();
});

// Then Steps - Assertions
Then('I should be on the vehicle details page', () => {
    vehicleDetailsPage.verifyOnVehicleDetailsPage();
});

Then('I should see the vehicle navigation header', () => {
    vehicleDetailsPage.verifyNavigationHeader();
});

Then('I should see the main vehicle image', () => {
    vehicleDetailsPage.verifyMainImage();
});

Then('I should see the vehicle title and year', () => {
    vehicleDetailsPage.verifyVehicleBrandAndModel();
    vehicleDetailsPage.verifyVehicleYear();
});

Then('I should see the vehicle specifications section', () => {
    vehicleDetailsPage.verifySpecificationsSection();
});

Then('I should see the vehicle brand and model', () => {
    vehicleDetailsPage.verifyVehicleBrandAndModel();
});

Then('I should see the vehicle year', () => {
    vehicleDetailsPage.verifyVehicleYear();
});

Then('I should see the vehicle location', () => {
    vehicleDetailsPage.verifyVehicleLocation();
});

Then('I should see the image thumbnail gallery', () => {
    vehicleDetailsPage.verifyImageGallery();
});

Then('the thumbnail images should be clickable', () => {
    vehicleDetailsPage.verifyThumbnailsClickable();
});

Then('the main image should change to the selected image', () => {
    vehicleDetailsPage.verifyMainImageChanged();
});

Then('the selected thumbnail should be highlighted', () => {
    vehicleDetailsPage.verifySelectedThumbnailHighlighted(1); // Second thumbnail (0-indexed)
});

Then('the main image should change to the third image', () => {
    vehicleDetailsPage.verifyMainImageChanged();
});

Then('the thumbnail gallery should scroll to show more images', () => {
    vehicleDetailsPage.verifyGalleryScrolled('right');
});

Then('the thumbnail gallery should scroll back to show previous images', () => {
    vehicleDetailsPage.verifyGalleryScrolled('left');
});

Then('I should see the battery specification', () => {
    vehicleDetailsPage.verifyBatterySpecification();
});

Then('I should see the charging specification', () => {
    vehicleDetailsPage.verifyChargingSpecification();
});

Then('I should see the drivetrain specification', () => {
    vehicleDetailsPage.verifyDrivetrainSpecification();
});

Then('I should see the range specification', () => {
    vehicleDetailsPage.verifyRangeSpecification();
});

Then('I should see the seats specification', () => {
    vehicleDetailsPage.verifySeatsSpecification();
});

Then('I should see the condition specification', () => {
    vehicleDetailsPage.verifyConditionSpecification();
});

Then('I should see the color specification', () => {
    vehicleDetailsPage.verifyColorSpecification();
});

Then('all specification fields should display valid values', () => {
    vehicleDetailsPage.verifyAllSpecificationsHaveValues();
});

Then('no specification field should be empty', () => {
    vehicleDetailsPage.verifyAllSpecificationsHaveValues();
});

Then('the specifications should be properly formatted', () => {
    vehicleDetailsPage.verifySpecificationsFormatted();
});

Then('I should be redirected to the listings page', () => {
    cy.url().should('not.include', '/ev/');
    homePage.verifyListingsPageLoaded();
});

Then('I should see the vehicle listings', () => {
    homePage.verifyVehicleListingsExist();
});

Then('the previous filters should be preserved', () => {
    // This depends on how your application handles state preservation
    homePage.verifyFiltersRemainActive();
});

Then('I should see the vehicle information', () => {
    vehicleDetailsPage.verifyVehicleInformation();
});

Then('the page should load all components properly', () => {
    vehicleDetailsPage.verifyAllComponentsLoaded();
});

Then('the image gallery should be functional', () => {
    vehicleDetailsPage.verifyImageGallery();
    vehicleDetailsPage.verifyThumbnailsClickable();
});

Then('the vehicle information should be mobile-friendly', () => {
    vehicleDetailsPage.verifyMobileFriendly();
});

Then('the image gallery should work on touch devices', () => {
    vehicleDetailsPage.verifyTouchDeviceFunctionality();
});

Then('I should see the vehicle price with proper currency formatting', () => {
    vehicleDetailsPage.verifyFormattedPrice();
});

Then('the vehicle should match search criteria {string}', (searchTerm: string) => {
    vehicleDetailsPage.verifyVehicleMatchesSearchCriteria(searchTerm);
});

Then('I should be able to return to search results', () => {
    vehicleDetailsPage.clickBackToListings();
    homePage.verifyURLContainsSearchParameter();
});

Then('the vehicle condition should be {string}', (expectedCondition: string) => {
    vehicleDetailsPage.verifyVehicleMatchesFilter(expectedCondition);
});

Then('I should be able to return to filtered results', () => {
    vehicleDetailsPage.clickBackToListings();
    homePage.verifyURLContainsFilterParameter();
});