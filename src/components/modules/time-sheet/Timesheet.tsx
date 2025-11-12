"use client";

import { exportToExcel, exportToPdf } from "@/utility/exportUtils";
import { useEffect, useState } from "react";
import { TimesheetFooter } from "./TimesheetFooter";
import { TimesheetHeader } from "./TimesheetHeader";
import { TimesheetTable } from "./TimesheetTable";

export const Timesheet = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [activePart, setActivePart] = useState<number>(1);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Amir Hossain",
      nabatatId: "407703",
      iqama: "2508658503",
      position: "Foreman",
      standardTime: Array(31).fill(8),
      overtime: Array(31).fill(2),
    },
    {
      id: 2,
      name: "Hilal Kamal",
      nabatatId: "401931",
      iqama: "2414440285",
      position: "Foreman",
      standardTime: Array(31).fill(8),
      overtime: Array(31).fill(2),
    },
    {
      id: 3,
      name: "MD ALKUS",
      nabatatId: "407277",
      iqama: "2518760430",
      position: "Gardener",
      standardTime: Array(31).fill(8),
      overtime: Array(31).fill(2),
    },
    {
      id: 4,
      name: "PRASENJIT DAS",
      nabatatId: "407411",
      iqama: "2518758228",
      position: "Gardener",
      standardTime: Array(31).fill(8),
      overtime: Array(31).fill(3),
    },
    {
      id: 5,
      name: "Hassan Nawaz",
      nabatatId: "401815",
      iqama: "2362623007",
      position: "Technician",
      standardTime: Array(31).fill(8),
      overtime: Array(31).fill(1),
    },
  ]);
  const [dateRange, setDateRange] = useState({
    start: 16,
    end: 15,
    startMonth: "October",
    endMonth: "November",
  });
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  // Calculate date range based on selected month
  useEffect(() => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Timesheet starts from 16th of current month to 15th of next month
    const startMonth = monthNames[selectedMonth];
    const endMonthIndex = (selectedMonth + 1) % 12;
    const endMonth = monthNames[endMonthIndex];
    setDateRange({
      start: 16,
      end: 15,
      startMonth,
      endMonth,
    });
  }, [selectedMonth, selectedYear]);
  // Handle hour change
  const handleHourChange = (
    employeeId: number,
    day: number,
    type: "standardTime" | "overtime",
    value: number
  ) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? {
              ...employee,
              [type]: employee[type].map((hours, i) =>
                i === day - 1 ? value : hours
              ),
            }
          : employee
      )
    );
  };
  // Get days for current part (1, 2, or 3)
  const getDaysForPart = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const nextMonthDays = 15;
    const totalDays = daysInMonth - 15 + nextMonthDays;
    // Part 1: days 16-25 of current month
    if (activePart === 1) {
      return Array.from(
        {
          length: 10,
        },
        (_, i) => i + 16
      );
    }
    // Part 2: days 26-end of current month + days 1-5 of next month
    else if (activePart === 2) {
      const days = [];
      // Current month days
      for (let i = 26; i <= daysInMonth; i++) {
        days.push(i);
      }
      // Next month days
      for (let i = 1; i <= 10 - (daysInMonth - 25); i++) {
        days.push(i);
      }
      return days;
    }
    // Part 3: days 6-15 of next month
    else {
      return Array.from(
        {
          length: 10,
        },
        (_, i) => i + 6
      );
    }
  };
  // Handle export
  const handleExport = (type: "pdf" | "excel") => {
    if (type === "pdf") {
      exportToPdf(employees, dateRange, selectedYear);
    } else {
      exportToExcel(employees, dateRange, selectedYear);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-[1400px] mx-auto">
      <TimesheetHeader
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        dateRange={dateRange}
      />
      <div className="p-4 border-b">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                activePart === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActivePart(1)}
            >
              Part 1 (16-25)
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePart === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActivePart(2)}
            >
              Part 2 (26-5)
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activePart === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setActivePart(3)}
            >
              Part 3 (6-15)
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => handleExport("excel")}
            >
              Export to Excel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={() => handleExport("pdf")}
            >
              Export to PDF
            </button>
          </div>
        </div>
        <TimesheetTable
          employees={employees}
          days={getDaysForPart()}
          handleHourChange={handleHourChange}
          activePart={activePart}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <TimesheetFooter />
    </div>
  );
};
