import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { SubmitQueryPage } from '../../support/pages/submitQuery.page';
import { submitQueryLocators } from '../locators/submitQuery.locators';

const submitQueryPage = new SubmitQueryPage();

Given('I am on the vehicle details page', () => {
    cy.visit('/vehicle/details/1');
});

Given('I am on the landing page', () => {
    cy.visit('/');
});

// Modal Opening Steps
When('I click the Submit Query button', () => {
    submitQueryPage.openSubmitQueryModal();
});

Given('the submit query modal is open', () => {
    submitQueryPage.verifyModalIsOpen();
});

Then('I should see the modal title {string}', (expectedTitle: string) => {
    submitQueryPage.verifyModalTitle(expectedTitle);
});

Then('I should see the enquiry title field', () => {
    cy.get(submitQueryLocators.enquiryTitleInput).should('be.visible');
});

Then('I should see the description field', () => {
    cy.get(submitQueryLocators.descriptionInput).should('be.visible');
});

Then('I should see the Add submit button', () => {
    submitQueryPage.verifySubmitButtonText();
});

// Form Filling Steps
When('I fill in the enquiry title with {string}', (title: string) => {
    submitQueryPage.fillEnquiryTitle(title);
});

When('I fill in the description with {string}', (description: string) => {
    submitQueryPage.fillDescription(description);
});

When('I leave the enquiry title field empty', () => {
    submitQueryPage.clearEnquiryTitle();
});

When('I leave the description field empty', () => {
    submitQueryPage.clearDescription();
});

// Form Submission Steps
When('I submit the query form', () => {
    submitQueryPage.submitQueryForm();
});

When('I submit the query form without filling required fields', () => {
    submitQueryPage.submitFormWithoutFilling();
});

// Success Verification Steps
Then('the query should be submitted successfully', () => {
    submitQueryPage.verifySuccessfulSubmission();
});

Then('the form should not be submitted', () => {
    submitQueryPage.verifyFormNotSubmitted();
});

Then('I should see validation error for enquiry title field', () => {
    submitQueryPage.verifyEnquiryTitleValidation();
});

Then('I should see validation error for description field', () => {
    submitQueryPage.verifyDescriptionValidation();
});

// Modal Closing Steps
When('I click the query close button', () => {
    submitQueryPage.closeModalWithX();
});

Then('the submit query modal should close', () => {
    submitQueryPage.verifyModalIsClosed();
});

// Accessibility Steps
Then('form labels should be properly associated with inputs', () => {
    submitQueryPage.verifyLabelsAssociation();
});

Then('required fields should be clearly marked with asterisk', () => {
    submitQueryPage.verifyRequiredFieldsMarked();
});

Then('the form should be keyboard navigable', () => {
    submitQueryPage.verifyKeyboardNavigation();
});

When('I fill in the description with text exceeding 100 characters', () => {
    const longText = 'A'.repeat(150); // 150 characters, exceeds limit
    submitQueryPage.fillDescription(longText);
});

// Specific validation error steps
Then('I should see {string} length validation error for {string} field', (expectedMessage: string, field: string) => {
    if (expectedMessage.includes('minimum')) {
        submitQueryPage.verifyTitleMinLengthError();
    } else if (expectedMessage.includes('maximum')) {
        if (field.includes('title')) {
            submitQueryPage.verifyTitleMaxLengthError();
        } else {
            submitQueryPage.verifyDescriptionMaxLengthError();
        }
    }
});