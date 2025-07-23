"use client";
import React from "react";
import ListItem from "./ListItem";
import DropDown from "../ui/DropDown";
import Pagination from "@/components/ui/Pagination";
import { EVDetails, EVListData } from "@/types";
import { useEVFilterSort } from "../hooks/useFilterSort";
import { usePagination } from "@/components/hooks/usePagination";
import {
  EV_FILTER_OPTIONS,
  EV_SORTING_OPTIONS,
  ITEMS_PER_PAGE,
} from "@/constants";
import { useURLQueryState } from "@/components/hooks/useURLQueryState";
import { useModal } from "../hooks/useModal";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import { useCreateSubmission } from "../hooks/useCreateSubmission";

const EvGridContainer = ({ evData }: { evData: EVListData }) => {
  const { state, updateState } = useURLQueryState();
  const { sortedData } = useEVFilterSort(evData, state.filter, state.sort);
  const { evList, totalPages } = usePagination(
    state.page,
    ITEMS_PER_PAGE,
    sortedData
  );
  const { isOpen, openModal, closeModal } = useModal();
  const { handleCreate, isLoading, isError, isSuccess } = useCreateSubmission();

  const handleClearFilters = () => {
    updateState({ filter: "", sort: "", page: 1 });
  };
  const isFiltersApplied =
    state.filter !== "" || state.sort !== "" || state.page !== 1;

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">EV Listings</h2>
        <div className="flex gap-2">
          {isFiltersApplied && (
            <button
              onClick={handleClearFilters}
              disabled={!isFiltersApplied}
              className="rounded-lg border-[1px]  text-base text-slate-900 px-2 
              bg-gray-200 text-black hover:bg-gray-300"
            >
              Clear
            </button>
          )}
          {/* Filter and Sorting Dropdown */}
          <DropDown
            options={EV_FILTER_OPTIONS}
            selectedOption={state.filter}
            handleChange={(value) => updateState({ filter: value })}
          />
          <DropDown
            options={EV_SORTING_OPTIONS}
            selectedOption={state.sort}
            handleChange={(value) => updateState({ sort: value })}
          />
        </div>
      </div>
      <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
        {evList.map((evItem: EVDetails) => {
          return (
            <React.Fragment key={evItem.id}>
              <ListItem item={evItem} />
            </React.Fragment>
          );
        })}
      </ul>

      {/* Pagination */}
      {evList.length ? (
        <Pagination
          currentPage={state.page}
          totalPages={totalPages}
          onPageChange={(newPage) => updateState({ page: newPage })}
        />
      ) : (
        <></>
      )}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Form
          onFormAction={handleCreate}
          closeModal={closeModal}
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
      </Modal>
      <button
        onClick={openModal}
        className="m-8 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
      >
        Submit Query
      </button>
    </div>
  );
};

export default EvGridContainer;
