import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

// 🔹 Fixed Domain List (Production Ready)
const DOMAIN_OPTIONS = [
  "Marketing and Sponsorship",
  "Media (Photographer / Videographer / Video Editor)",
  "Content Writing",
  "Public Relations",
  "Technical",
  "Graphic Designing",
  "Public Speaking",
  "Human Resource",
  "Research and Development",
  "Fine Arts",
  "Event Management",
  "Influencers",
  "Models",
];

const SubmissionsTable = ({ submissions }) => {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");

  // 🔹 Filter Logic (FIXED)
  const filteredData = useMemo(() => {
    return submissions.filter((item) => {
      const searchText = search.toLowerCase();

      const matchSearch =
        item.name?.toLowerCase().includes(searchText) ||
        item.email?.toLowerCase().includes(searchText);

      const matchDomain =
        !domain ||
        item.domain?.toLowerCase() === domain.toLowerCase();

      return matchSearch && matchDomain;
    });
  }, [submissions, search, domain]);

  // 🔹 Columns
  const columns = useMemo(
    () => [
      { accessorKey: "submittedAt", header: "Submitted At" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "contact", header: "Contact" },
      { accessorKey: "domain", header: "Domain" },
      { accessorKey: "experience", header: "Experience" },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>

      {/* 🔹 Top Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Submissions
          </h2>

          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#040720]"
          >
            <option value="">All Domains</option>
            {DOMAIN_OPTIONS.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Right */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          className="w-full md:w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#040720]"
        />

      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full min-w-[900px] text-sm">

          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-3 text-left text-gray-600 cursor-pointer font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-gray-700 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-400"
                >
                  No submissions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>

    </div>
  );
};

export default SubmissionsTable;