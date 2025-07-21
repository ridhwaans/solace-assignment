import React from "react";
import { Advocate } from "./page";

export function TableRow({ advocate }: { advocate: Advocate }) {
  return (
    <tr className="odd:bg-gray-50 even:bg-white hover:bg-blue-50 transition">
      <td className="px-4 py-2 border text-center">{advocate.id}</td>
      <td className="px-4 py-2 border">{advocate.firstName}</td>
      <td className="px-4 py-2 border">{advocate.lastName}</td>
      <td className="px-4 py-2 border">{advocate.city}</td>
      <td className="px-4 py-2 border">{advocate.degree}</td>
      <td className="px-4 py-2 border">
        {Array.isArray(advocate.specialties) ? (
          advocate.specialties.map((s, i) => (
            <div key={i} className="text-sm text-gray-700">
              {s}
            </div>
          ))
        ) : null}
      </td>
      <td className="px-4 py-2 border text-center">{advocate.yearsOfExperience}</td>
      <td className="px-4 py-2 border text-center">{advocate.phoneNumber}</td>
    </tr>
  );
}