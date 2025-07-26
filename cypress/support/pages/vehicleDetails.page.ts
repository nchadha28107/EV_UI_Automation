import { vehicleDetailsLocators } from '../locators/vehicleDetails.locators';
import vehicleDetails from '../../fixtures/vehicleDetails.json';

export class VehicleDetailsPage {

    navigateToVehicleDetailsViaURL(vehicleId: string) {
        cy.visit(`/ev/${vehicleId}`);
        cy.window().should('have.property', 'document');
        cy.document().should('have.property', 'readyState', 'complete');
    }

    clickBackToListings() {
        cy.intercept('GET', /\.*(?:page|rsc)=/).as('backNavigation');
        cy.get(vehicleDetailsLocators.backToListings).should('have.text', vehicleDetails.backToListings).click();
        cy.wait('@backNavigation');
    }

    // Page Verification Methods
    verifyPageLoaded() {
        cy.get(vehicleDetailsLocators.mainContainer).should('be.visible');
        cy.get(vehicleDetailsLocators.vehicleTitle).should('be.visible');
        cy.get(vehicleDetailsLocators.mainImage).should('be.visible');
    }

    verifyOnVehicleDetailsPage() {
        cy.url().should('include', '/ev/');
        this.verifyPageLoaded();
    }

    verifyNavigationHeader() {
        cy.get(vehicleDetailsLocators.navigationHeader).should('be.visible');
        cy.get(vehicleDetailsLocators.backToListings)
            .should('be.visible')
            .and('contain.text', '← Back to Listings');
    }

    // Vehicle Information Methods
    verifyVehicleInformation() {
        cy.get(vehicleDetailsLocators.vehicleTitle).should('be.visible').and('not.be.empty');
        cy.get(vehicleDetailsLocators.vehicleLocation).should('be.visible').and('not.be.empty');
        cy.get(vehicleDetailsLocators.vehiclePrice).should('be.visible').and('not.be.empty');
    }

    verifyVehicleBrandAndModel() {
        cy.get(vehicleDetailsLocators.vehicleTitle).should('be.visible').then(($title) => {
            const titleText = $title.text().trim();
            expect(titleText).to.not.be.empty;
            expect(titleText).to.match(/\w+\s+\w+/); // Should contain at least brand and model
        });
    }

    verifyVehicleYear() {
        cy.get(vehicleDetailsLocators.vehicleTitle).should('contain.text', '(20'); // Assumes year format (20XX)
    }

    verifyVehicleLocation() {
        cy.get(vehicleDetailsLocators.vehicleLocation).should('be.visible').and('not.be.empty');
    }

    verifyFormattedPrice() {
        cy.get(vehicleDetailsLocators.vehiclePrice).should('be.visible').then(($price) => {
            const priceText = $price.text().trim();
            expect(priceText).to.match(vehicleDetailsLocators.pricePattern);
        });
    }

    // Image Gallery Methods
    verifyMainImage() {
        cy.get(vehicleDetailsLocators.mainImage)
            .should('be.visible')
            .and('have.attr', 'src')
            .and('not.be.empty');
    }

    verifyImageGallery() {
        cy.get(vehicleDetailsLocators.thumbnailGalleryContainer).should('be.visible');
        cy.get(vehicleDetailsLocators.leftScrollButton).should('be.visible');
        cy.get(vehicleDetailsLocators.rightScrollButton).should('be.visible');
        cy.get(vehicleDetailsLocators.thumbnailImage).should('have.length.greaterThan', 0);
    }

    verifyThumbnailsClickable() {
        cy.get(vehicleDetailsLocators.thumbnailImage).each(($thumbnail) => {
            cy.wrap($thumbnail).should('have.attr', 'src').and('not.be.empty');
        });
    }

    clickThumbnailByIndex(index: number) {
        cy.get(vehicleDetailsLocators.thumbnailImageByIndex(index)).click();
    }

    clickSecondThumbnail() {
        this.clickThumbnailByIndex(1); // 0-indexed, so 1 is the second
    }

    clickThirdThumbnail() {
        this.clickThumbnailByIndex(2);
    }

    verifyMainImageChanged() {
        // Store current src and verify it changes
        cy.get(vehicleDetailsLocators.mainImage).invoke('attr', 'src').then((currentSrc) => {
            cy.get('@previousImageSrc').then((previousSrc) => {
                expect(currentSrc).to.not.equal(previousSrc);
            });
        });
    }

    storeCurrentMainImageSrc() {
        cy.get(vehicleDetailsLocators.mainImage).invoke('attr', 'src').as('previousImageSrc');
    }

    verifySelectedThumbnailHighlighted(index: number) {
        // This would depend on your CSS implementation for selected state
        cy.get(vehicleDetailsLocators.thumbnailImageByIndex(index))
            .parent()
            .should(($parent) => {
                const hasSelectedClass = $parent.hasClass('selected');
                const hasBorder = $parent.css('border') !== 'none' && $parent.css('border') !== '0px none rgb(0, 0, 0)';
                const hasOpacityChange = $parent.css('opacity') !== '1';
                
                expect(hasSelectedClass || hasBorder || hasOpacityChange).to.be.true;
        });
    }

    clickLeftScrollButton() {
        cy.get(vehicleDetailsLocators.leftScrollButton).click();
    }

    clickRightScrollButton() {
        cy.get(vehicleDetailsLocators.rightScrollButton).click();
    }

    verifyGalleryScrolled(direction: 'left' | 'right') {
        // Store current scroll position and verify it changed
        cy.get(vehicleDetailsLocators.thumbnailScrollContainer).then(($container) => {
            const initialScrollLeft = $container[0].scrollLeft;
            
            if (direction === 'right') {
                cy.get(vehicleDetailsLocators.rightScrollButton).click();
                cy.get(vehicleDetailsLocators.thumbnailScrollContainer).should(($newContainer) => {
                    expect($newContainer[0].scrollLeft).to.be.greaterThan(initialScrollLeft);
                });
            } else {
                cy.get(vehicleDetailsLocators.leftScrollButton).click();
                cy.get(vehicleDetailsLocators.thumbnailScrollContainer).should(($newContainer) => {
                    expect($newContainer[0].scrollLeft).to.be.lessThan(initialScrollLeft);
                });
            }
        });
    }

    // Specifications Methods
    verifySpecificationsSection() {
        cy.get(vehicleDetailsLocators.specificationsContainer).should('be.visible');
        cy.get(vehicleDetailsLocators.specificationsTitle)
            .should('be.visible')
            .and('contain.text', 'Vehicle Specifications');
    }

    verifySpecificationExists(specLabel: string) {
        cy.get(vehicleDetailsLocators.getSpecByLabel(specLabel)).should('be.visible');
    }

    verifyBatterySpecification() {
        this.verifySpecificationExists('Battery');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Battery')).should('not.be.empty');
    }

    verifyChargingSpecification() {
        this.verifySpecificationExists('Charging');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Charging')).should('not.be.empty');
    }

    verifyDrivetrainSpecification() {
        this.verifySpecificationExists('Drivetrain');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Drivetrain')).should('not.be.empty');
    }

    verifyRangeSpecification() {
        this.verifySpecificationExists('Range');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Range')).should('not.be.empty');
    }

    verifySeatsSpecification() {
        this.verifySpecificationExists('Seats');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Seats')).should('not.be.empty');
    }

    verifyConditionSpecification() {
        this.verifySpecificationExists('Condition');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Condition')).should('not.be.empty');
    }

    verifyColorSpecification() {
        this.verifySpecificationExists('Color');
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Color')).should('not.be.empty');
    }

    verifyAllSpecificationsHaveValues() {
        cy.get(vehicleDetailsLocators.specificationValue).each(($value) => {
            cy.wrap($value).should('not.be.empty').and('not.contain.text', 'undefined');
        });
    }

    verifySpecificationsFormatted() {
        cy.get(vehicleDetailsLocators.specificationsGrid).should('have.class', 'grid');
        cy.get(vehicleDetailsLocators.specificationItem).should('have.length.greaterThan', 0);
    }

    // Error Handling Methods
    verifyErrorMessage() {
        cy.get(vehicleDetailsLocators.errorMessage).should('be.visible');
    }

    // Mobile and Responsive Methods
    verifyMobileFriendly() {
        cy.viewport('iphone-x');
        cy.get(vehicleDetailsLocators.vehicleInfoContainer).should('be.visible');
        cy.get(vehicleDetailsLocators.specificationsGrid).should('be.visible');
    }

    verifyTouchDeviceFunctionality() {
        cy.get(vehicleDetailsLocators.thumbnailImage).first().trigger('touchstart');
        cy.get(vehicleDetailsLocators.thumbnailImage).first().trigger('touchend');
    }

    // Integration Methods
    verifyVehicleMatchesSearchCriteria(searchTerm: string) {
        cy.get(vehicleDetailsLocators.vehicleTitle).should('contain.text', searchTerm, { matchCase: false });
    }

    verifyVehicleMatchesFilter(filterValue: string) {
        cy.get(vehicleDetailsLocators.getSpecValueByLabel('Condition')).should('contain.text', filterValue);
    }

    verifyAllComponentsLoaded() {
        this.verifyPageLoaded();
        this.verifyImageGallery();
        this.verifySpecificationsSection();
    }
}