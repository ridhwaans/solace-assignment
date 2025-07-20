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
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [error, setError] = useState<string | null>(null); 

   useEffect(() => {
    const fetchAdvocates = async () => {
      if (process.env.NODE_ENV === "development") {
        console.log("fetching advocates...");
      }

      try {
        const response = await fetch("/api/advocates");

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const json = await response.json();
        setAdvocates(json.data);
        setFilteredAdvocates(json.data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch advocates:", err);
        setError(
          "Failed to load advocate data. Please try again later."
        );
      }
    };

    fetchAdvocates();
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (process.env.NODE_ENV === "development") {
      console.log("filtering advocates...");
    }
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialties.some((s) =>
          typeof s === "string"
            ? s.toLowerCase().includes(searchTerm.toLowerCase())
            : false
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTerm) || 
        advocate.phoneNumber.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const resetSearch = () => {
    if (process.env.NODE_ENV === "development") {
      console.log(advocates);
    }
    setFilteredAdvocates(advocates);
    setSearchTerm("");
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

      <SearchBox searchTerm={searchTerm} onChange={onChange} onReset={resetSearch} />

      {error ? (
        <p className="text-red-600 text-center my-6">{error}</p>
      ) : (
        <Table advocates={filteredAdvocates} />
      )}
    </main>
  );
}
