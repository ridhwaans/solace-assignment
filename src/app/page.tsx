"use client";

import { useEffect, useState } from "react";
import { SearchBox } from "./SearchBox";
import { Table } from "./Table";

export type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: any[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchAdvocates = async () => {
    try {
      const params = new URLSearchParams({
        filter: searchTerm,
        sortBy,
        sortOrder,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      const response = await fetch(`/api/advocates?${params}`);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      const json = await response.json();
      console.log(json)
      setAdvocates(json.data);
      setPagination(json.pagination);
      setError(null);
    } catch (err: any) {
      setError("Failed to load advocate data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAdvocates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortOrder, page, pageSize]);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setPage(1);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

if (error) {
   return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="border border-red-400 bg-red-50 text-red-700 rounded-md shadow-md text-center font-semibold p-6">
        {error}
      </div>
    </main>
  );
}

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Solace Advocates</h1>
      <SearchBox
        searchTerm={searchTerm}
        onChange={onChange}
        onReset={resetSearch}
      />
      <Table
        advocates={advocates}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        page={page}
        pageSize={pageSize}
        pagination={pagination}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </main>
  );
}