import { submitQueryLocators } from '../locators/submitQuery.locators';
import submitQuery from '../../fixtures/submitQuery.json';

export class SubmitQueryPage {

    // Modal Management Methods
    openSubmitQueryModal() {
        cy.get(submitQueryLocators.submitQueryButton).click();
        this.verifyModalIsOpen();
    }

    closeModalWithX() {
        cy.get(submitQueryLocators.closeButton).click();
    }

    verifyModalIsOpen() {
        cy.get(submitQueryLocators.modalContainer).should('be.visible');
        cy.get(submitQueryLocators.modalTitle).should('be.visible');
    }

    verifyModalIsClosed() {
        cy.get(submitQueryLocators.modalContainer).should('not.exist');
    }

    // Form Field Methods
    fillEnquiryTitle(title: string) {
        cy.get(submitQueryLocators.enquiryTitleInput).clear().type(title);
    }

    fillDescription(description: string) {
        cy.get(submitQueryLocators.descriptionInput).clear().type(description);
    }

    clearEnquiryTitle() {
        cy.get(submitQueryLocators.enquiryTitleInput).clear();
    }

    clearDescription() {
        cy.get(submitQueryLocators.descriptionInput).clear();
    }

    // Form Submission Methods
    submitQueryForm() {
        cy.get(submitQueryLocators.submitButton).click();
    }

    submitFormWithoutFilling() {
        cy.get(submitQueryLocators.submitButton).click();
    }

    verifyModalTitle(expectedTitle: string) {
        cy.get(submitQueryLocators.modalTitle).should('contain', expectedTitle);
    }

    verifySubmitButtonText() {
        cy.get(submitQueryLocators.submitButton).should('be.visible');
    }

    // Field Validation Methods
    verifyRequiredFieldsMarked() {
        cy.get(submitQueryLocators.enquiryTitleLabel).should('contain', '*');
        cy.get(submitQueryLocators.descriptionLabel).should('contain', '*');
    }

    verifyEnquiryTitleValidation() {
        cy.get(submitQueryLocators.titleError).should('be.visible').should('have.text', submitQuery.fieldRequiredError);
    }

    verifyDescriptionValidation() {
        cy.get(submitQueryLocators.descriptionError).should('be.visible').should('have.text', submitQuery.fieldRequiredError);
    }

    // Success and Error Handling
    verifySuccessfulSubmission() {
        cy.xpath(submitQueryLocators.successMessage).should('be.visible');
    }

    verifyFormNotSubmitted() {
        // Verify modal is still open and form is still visible
        this.verifyModalIsOpen();
        cy.get(submitQueryLocators.form).should('be.visible');
    }

    // Accessibility Methods
    verifyLabelsAssociation() {
        cy.get(submitQueryLocators.enquiryTitleLabel).within(() => {
            cy.get(submitQueryLocators.enquiryTitleInput).should('exist');
        });

        cy.get(submitQueryLocators.descriptionLabel).within(() => {
            cy.get('input[name="description"]').should('exist');
        });
    }

    verifyKeyboardNavigation() {
        // Tab through form elements
        cy.get(submitQueryLocators.enquiryTitleInput).focus();
        cy.get(submitQueryLocators.enquiryTitleInput).should('be.focused');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get(submitQueryLocators.descriptionInput).should('be.focused');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get(submitQueryLocators.submitButton).should('be.focused');
    }

    // Error Message Verification Methods
    verifyTitleMinLengthError() {
        cy.get(submitQueryLocators.titleError).should('be.visible').should('have.text', submitQuery.titleMinimumLengthError);
    }

    verifyTitleMaxLengthError() {
        cy.get(submitQueryLocators.titleError).should('be.visible').should('have.text', submitQuery.titleMaximumLengthError);
    }

    verifyDescriptionMaxLengthError() {
        cy.get(submitQueryLocators.descriptionError).should('be.visible').should('have.text', submitQuery.descriptionMaximumLengthError);
    }
}