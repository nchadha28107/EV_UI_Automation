export const submitQueryLocators = {
    submitQueryButton: '.m-8.rounded-md.bg-blue-500.px-4.py-2.text-white',

    modalContainer: '.modal-container',
    modalTitle: '.font-2xl.font-medium',
    closeButton: '.text-secondary-color .cursor-pointer.font-bold',

    form: 'form.space-y-4',

    enquiryTitleLabel: 'label:contains("Enquiry Title*:")',
    enquiryTitleInput: 'input[name="title"]',
    descriptionLabel: 'label:contains("Description*:")',
    descriptionInput: 'input[name="description"]',

    submitButton: '.modal-container button[type="submit"]',

    titleError: 'input[name="title"] + span.text-red-500',
    descriptionError: 'input[name="description"] + span.text-red-500',
    successMessage: '//*[text()="Query submitted successfully!"]'
}