"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";

import { Column } from "@/components/shared/ManagmentTable";

import { IEmployee } from "@/types/employee.interface";

export const employeesColumns: Column<IEmployee>[] = [
  {
    header: "S.No",
    accessor: (employee) => (
      <span className="text-sm font-medium">{employee.S_NO}</span>
    ),
  },

  {
    header: "Employee Name",
    accessor: (employee) => (
      <span className="text-sm font-medium">{employee.name}</span>
    ),
  },
  {
    header: "Employee ID",
    accessor: (employee) => (
      <span className="text-sm font-medium">{employee.idNumber}</span>
    ),
  },
  {
    header: "Department",
    accessor: (employee) => (
      <span className="text-sm">{employee.group || "N/A"}</span>
    ),
  },
  {
    header: "Position",
    accessor: (employee) => (
      <span className="text-sm">{employee.jobTitle || "N/A"}</span>
    ),
  },
  {
    header: "Contact",
    accessor: (employee) => (
      <div className="flex flex-col">
        <span className="text-sm">{employee.phoneNumber}</span>
      </div>
    ),
  },
  {
    header: "Email",
    accessor: (employee) => (
      <div className="flex flex-col">
        <span className="text-sm">{employee.email}</span>
      </div>
    ),
  },
  // {
  //   header: "Salary",
  //   accessor: (employee) => (
  //     <span className="text-sm font-semibold text-green-600">
  //       ${employee.salary}
  //     </span>
  //   ),
  // },
  {
    header: "Gender",
    accessor: (employee) => (
      <span className="text-sm capitalize">
        {employee.gender?.toLowerCase()}
      </span>
    ),
  },
  {
    header: "nationality",
    accessor: (employee) => (
      <span className="text-sm capitalize">
        {employee.nationality?.toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (employee) => <StatusBadgeCell isDeleted={employee.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (employee) => <DateCell date={employee.createdAt} />,
  },
];
