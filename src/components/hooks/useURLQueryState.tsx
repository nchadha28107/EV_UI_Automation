"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type UrlState = {
  filter: string;
  sort: string;
  page: number;
};

export const useURLQueryState = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // forming initial state from URL
  const getInitialState: UrlState = {
    filter: searchParams.get("filter") || "",
    sort: searchParams.get("sort") || "",
    page: Number(searchParams.get("page")) || 1,
  };

  const [state, setState] = useState<UrlState>(getInitialState);

  // function to update URL state
  const updateState = (newState: Partial<UrlState>) => {
    
    const updatedState = { ...state, ...newState };

    setState(updatedState);

    const params = new URLSearchParams();
    if (updatedState.filter) params.set("filter", updatedState.filter);
    if (updatedState.sort) params.set("sort", updatedState.sort);
    params.set("page", updatedState.page.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // user manually updates URL or navigates back/forward
  useEffect(() => {
    setState(getInitialState);
  }, [searchParams]);

  return { state, updateState };
};
