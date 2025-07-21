import React from "react";
import { Advocate } from "./page";
import { TableRow } from "./TableRow";

export function Table({
  advocates,
  sortBy,
  sortOrder,
  onSort,
  page,
  pageSize,
  pagination,
  setPage,
  setPageSize,
}: {
  advocates: Advocate[];
  sortBy: string;
  sortOrder: string;
  onSort: (field: string) => void;
  page: number;
  pageSize: number;
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}) {
  return (
    <div className="overflow-x-auto">

      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm">
            Show
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">
            of {pagination.total} total results
          </span>
        </div>
      </div>

      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th onClick={() => onSort("id")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              ID {sortBy === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => onSort("firstName")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              First Name {sortBy === "firstName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => onSort("lastName")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              Last Name {sortBy === "lastName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => onSort("city")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              City {sortBy === "city" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => onSort("degree")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              Degree {sortBy === "degree" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">Specialties</th>
            <th onClick={() => onSort("yearsOfExperience")} className="cursor-pointer px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">
              Years {sortBy === "yearsOfExperience" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="px-6 py-3 text-left font-semibold tracking-wide border border-blue-700">Phone</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <TableRow key={advocate.id} advocate={advocate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}