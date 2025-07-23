"use client";
import React from "react";
import Form from "next/form";
import Link from "next/link";

type SearchInputProps = {
  searchTerm?: string;
};

const SearchInput = ({ searchTerm }: SearchInputProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget).get("query") as string;
    const query = formData.trim();

    if (!query) {
      e.preventDefault();
      return;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const isValid = input.value.trim().length > 0;
    const submitButton = input.form?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    if (submitButton) {
      submitButton.disabled = !isValid;
    }
  };

  const resetInput = () => {
    const form = document.querySelector(".search-form-label") as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <>
      <Form
      role="form"
        action=""
        className="search-form text-black flex justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          name="query"
          type="text"
          placeholder="Search your EV here..."
          defaultValue={searchTerm}
          required
          minLength={3}
          onChange={handleInputChange}
          className="px-4 py-2 rounded-lg border-none w-1/2"
        />
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            disabled
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Search
          </button>
          <button
            type="submit"
            onClick={resetInput}
            className="bg-teal-100 text-indigo-800 font-semibold py-2 px-4 rounded"
          >
            {" "}
            <Link href={"/"}>Clear</Link>
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchInput;
