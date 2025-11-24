// app/id-validation/page.tsx
"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { useMemo, useState } from "react";
import { CSVLink } from "react-csv";

const mockData = [
  {
    name: "A-Kabir Miah",
    position: "Gardener",
    dacoId: 0,
    dacoValid: "01-Jun-2025",
    iqamaDate: "10-Aug-2026",
    sapId: 408389,
    iqamaNumber: 2532067424,
    workLocation: "GVIP",
    iqamaDays: 260,
    dacoDays: -175,
  },
  {
    name: "ABDALLA SAMIR AHMED SAYED",
    position: "Asst.Accounting",
    dacoId: 0,
    dacoValid: "01-Jun-2024",
    iqamaDate: "10-Aug-2024",
    sapId: 414041,
    iqamaNumber: 2554504510,
    workLocation: "Management",
    iqamaDays: -470,
    dacoDays: -540,
  },
  // add more rows
];

export default function IdValidation() {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<any>(null);

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, data]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Position",
      "DACO & Id",
      "DACO-valid",
      "IQAMA-Date",
      "SAP-ID",
      "IQAMA-NUMBER",
      "Work Location",
      "Iqama (Days)",
      "DACO (Days)",
    ];
    const tableRows = data.map((row) => [
      row.name,
      row.position,
      row.dacoId,
      row.dacoValid,
      row.iqamaDate,
      row.sapId,
      row.iqamaNumber,
      row.workLocation,
      row.iqamaDays,
      row.dacoDays,
    ]);
    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("id-validation.pdf");
  };

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditRow({ ...data[index] });
  };

  const saveEdit = () => {
    if (editIndex !== null && editRow) {
      const newData = [...data];
      newData[editIndex] = editRow;
      setData(newData);
      setEditIndex(null);
      setEditRow(null);
    }
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={exportPDF}
        >
          Export PDF
        </button>
        <CSVLink data={data} filename={"id-validation.csv"}>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Export CSV
          </button>
        </CSVLink>
        <input
          type="text"
          placeholder="Search by name..."
          className="px-2 py-1 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">DACO & Id</th>
              <th className="border px-4 py-2">DACO-valid</th>
              <th className="border px-4 py-2">IQAMA-Date</th>
              <th className="border px-4 py-2">SAP-ID</th>
              <th className="border px-4 py-2">IQAMA-NUMBER</th>
              <th className="border px-4 py-2">Work Location</th>
              <th className="border px-4 py-2">Iqama (Days)</th>
              <th className="border px-4 py-2">DACO (Days)</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => {
              const realIndex = (currentPage - 1) * rowsPerPage + idx;
              return (
                <tr key={realIndex} className="text-center">
                  <td className="border px-4 py-2">
                    {editIndex === realIndex ? (
                      <input
                        type="text"
                        value={editRow.name}
                        onChange={(e) =>
                          setEditRow({ ...editRow, name: e.target.value })
                        }
                        className="border px-1 py-1 w-full"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editIndex === realIndex ? (
                      <input
                        type="text"
                        value={editRow.position}
                        onChange={(e) =>
                          setEditRow({ ...editRow, position: e.target.value })
                        }
                        className="border px-1 py-1 w-full"
                      />
                    ) : (
                      row.position
                    )}
                  </td>
                  <td className="border px-4 py-2">{row.dacoId}</td>
                  <td className="border px-4 py-2">{row.dacoValid}</td>
                  <td className="border px-4 py-2">{row.iqamaDate}</td>
                  <td className="border px-4 py-2">{row.sapId}</td>
                  <td className="border px-4 py-2">{row.iqamaNumber}</td>
                  <td className="border px-4 py-2">{row.workLocation}</td>
                  <td
                    className={`border px-4 py-2 ${
                      row.iqamaDays >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.iqamaDays}
                  </td>
                  <td
                    className={`border px-4 py-2 ${
                      row.dacoDays >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.dacoDays}
                  </td>
                  <td className="border px-4 py-2 flex gap-1 justify-center">
                    {editIndex === realIndex ? (
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                        onClick={() => handleEdit(realIndex)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(realIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
