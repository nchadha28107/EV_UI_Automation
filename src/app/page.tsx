import { getEvData, getFilteredEvs } from "@/mock/getEvData";
import React from "react";
import SearchInput from "@/components/ui/SearchInput";
import EvGridContainer from "@/components/ev/EvGridContainer";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {

  const query = (await searchParams).query;
  const evList = query ? await getFilteredEvs(query) : await getEvData();


  return (
    <>
      <section className="bg-indigo-800 text-white text-center py-20">
        <h1 className="text-4xl font-bold">
          Find Your Electric Vehicle Today
        </h1>
        <p className="mt-4 text-lg">
          Browse through a wide range of electric vehicles.
        </p>
        <div className="mt-6">
          <SearchInput searchTerm={query} />
        </div>
      </section>
      <div className="p-4 container mx-auto">
        <section className="text-center">
          {query && <p className="text-2xl">search results for &ldquo;<strong>{query}</strong>&ldquo;</p>}
          {query?.length && !evList.length ? (
            <p className="text-xl py-6">No results found!</p>
          ) : (
            <EvGridContainer evData={evList} />
          )}
        </section>
      </div>
    </>
  );
}
