import React from "react";

export function SearchBox({
  searchTerm,
  onChange,
  onReset,
}: {
  searchTerm: string;
  onChange: (value: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block text-lg font-semibold mb-1">
        Search Advocates
      </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, city, degree, specialties, YOE, or phone number"
        className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onReset}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        aria-label="Reset Search"
      >
        Reset Search
      </button>
      <p className="mt-2 text-sm text-gray-600">
        Searching for: <span className="font-medium">{searchTerm || "none"}</span>
      </p>
    </div>
  );
}
