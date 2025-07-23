import { useState, useEffect } from "react";
import { EVListData } from "@/types";

export const usePagination = (
  pageNumber: number,
  itemsPerPage: number = 10,
  sortedData: EVListData
) => {
  const [evList, setEvList] = useState<EVListData>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEvs = () => {
      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = pageNumber * itemsPerPage;

      const paginatedData = sortedData.slice(startIndex, endIndex);
      setEvList(paginatedData);
      setTotalPages(Math.ceil(sortedData.length / itemsPerPage));
    };

    fetchEvs();
  }, [pageNumber, itemsPerPage, sortedData]);

  return { evList, totalPages };
};
