export const EV_FILTER_OPTIONS = [
  { id: 1, text: "All", value: "" },
  { id: 2, text: "New", value: "Used" },
  { id: 3, text: "Used", value: "New" },
];

export const EV_SORTING_OPTIONS = [
  { id: 1, text: "Sort", value: "" },
  { id: 2, text: "Low to High", value: "asc" },
  { id: 3, text: "High to Low", value: "desc" },
];

// Number of list items to display in single page
export const ITEMS_PER_PAGE = 10;

export enum EV_CURRENT_STATUS {
  USED = "Used",
  NEW = "New",
}

export enum SORTING_VALUE {
  ASCEND = "asc",
  DESCEND = "desc",
}

export const FORM_FIELDS = [
  {
    name: "title",
    label: "Enquiry Title*",
    placeholder: "Enter your enquiry",
    validation: {
      required: "This field is required",
      minLength: { value: 3, message: "Title must be at least 3 characters" },
      maxLength: { value: 25, message: "Max. of 25 characters allowed" },
    },
  },
  {
    name: "description",
    label: "Description*",
    placeholder: "Explain your request",
    required: "Description is required",
    validation: {
      maxLength: { value: 100, message: "Max. of 100 characters allowed" },
    },
  },
];