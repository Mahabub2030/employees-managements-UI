"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagmentTable";

import { IEmployee } from "@/types/employee.interface";

export const employeesColumns: Column<IEmployee>[] = [
  {
    header: "Employee",
    accessor: (employee) => (
      <UserInfoCell
        name={employee.name}
        email={employee.email}
        photo={employee.profilePhoto}
      />
    ),
  },
  {
    header: "Employee ID",
    accessor: (employee) => (
      <span className="text-sm font-medium">{employee.employeeId}</span>
    ),
  },
  {
    header: "Department",
    accessor: (employee) => (
      <span className="text-sm">{employee.department || "N/A"}</span>
    ),
  },
  {
    header: "Position",
    accessor: (employee) => (
      <span className="text-sm">{employee.position || "N/A"}</span>
    ),
  },
  {
    header: "Contact",
    accessor: (employee) => (
      <div className="flex flex-col">
        <span className="text-sm">{employee.contactNumber}</span>
      </div>
    ),
  },
  {
    header: "Salary",
    accessor: (employee) => (
      <span className="text-sm font-semibold text-green-600">
        ${employee.salary}
      </span>
    ),
  },
  {
    header: "Gender",
    accessor: (employee) => (
      <span className="text-sm capitalize">
        {employee.gender?.toLowerCase()}
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
