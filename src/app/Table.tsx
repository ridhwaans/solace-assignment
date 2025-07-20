import { TableRow } from "./TableRow";
import type { Advocate } from "./page";

export function Table({ advocates }: { advocates: Advocate[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            {[
              "#",
              "First Name",
              "Last Name",
              "City",
              "Degree",
              "Specialties",
              "Years of Experience",
              "Phone Number",
            ].map((heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left font-semibold tracking-wide border border-blue-700"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {advocates.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-6 text-gray-500 italic"
              >
                No advocates found.
              </td>
            </tr>
          ) : (
            advocates.map((advocate, index) => (
              <TableRow key={advocate.id} advocate={advocate} index={index} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
