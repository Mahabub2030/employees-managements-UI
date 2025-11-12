"use client";

import { useState } from "react";
import { TimesheetTable } from "../time-sheet/TimesheetTable";
// Adjust the import path

interface Employee {
  id: number;
  name: string;
  nabatatId: string;
  iqama: string;
  position: string;
  standardTime: number[];
  overtime: number[];
}

export default function Timesheetfull() {
  // Example employee data
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      nabatatId: "12345",
      iqama: "67890",
      position: "Software Engineer",
      standardTime: Array(10).fill(0),
      overtime: Array(10).fill(0),
    },
    {
      id: 2,
      name: "Jane Smith",
      nabatatId: "54321",
      iqama: "09876",
      position: "Project Manager",
      standardTime: Array(10).fill(0),
      overtime: Array(10).fill(0),
    },
  ]);

  const days = Array.from({ length: 10 }, (_, i) => i + 1); // Days 1-10

  const handleHourChange = (
    employeeId: number,
    day: number,
    type: "standardTime" | "overtime",
    value: number
  ) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              [type]: emp[type].map((h, idx) => (idx === day - 1 ? value : h)),
            }
          : emp
      )
    );
  };

  const activePart = 1; // Example, can be dynamic
  const selectedMonth = new Date().getMonth(); // Current month
  const selectedYear = new Date().getFullYear(); // Current year

  return (
    <div className="container mx-auto mt-10">
      <TimesheetTable
        employees={employees}
        days={days}
        handleHourChange={handleHourChange}
        activePart={activePart}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
}
