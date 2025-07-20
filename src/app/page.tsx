"use client";

import { useEffect, useState } from "react";

type Advocate = {
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
      <main style={{ margin: "24px" }}>
          {error}
      </main>
    );
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} value={searchTerm} onChange={onChange} />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
