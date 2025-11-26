"use client";

import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagmentTable";
import { IEmployeeId } from "@/types/employee.interface";

export const employeesIdColumns: Column<IEmployeeId>[] = [
  {
    header: "S.No",
    accessor: (employeeId) => (
      <span className="text-sm font-medium">{employeeId.S_NO}</span>
    ),
  },
  {
    header: "Employee Name",
    accessor: (employeeId) => (
      <UserInfoCell
        name={employeeId.name}
        email={employeeId.email}
        photo={employeeId.profilePhoto}
      />
    ),
  },
  {
    header: "Employee ID",
    accessor: (employeeId) => (
      <span className="text-sm font-medium">{employeeId.employeeId}</span>
    ),
  },
  {
    header: "IdNumber",
    accessor: (employeeId) => (
      <span className="text-sm">{employeeId.IdNumber || "N/A"}</span>
    ),
  },
  {
    header: "IqamaExpireDate",
    accessor: (employeeId) => (
      <span className="text-sm">{employeeId.IqamaExpireDate || "N/A"}</span>
    ),
  },
  {
    header: "IdNumber",
    accessor: (employeeId) => (
      <div className="flex flex-col">
        <span className="text-sm">{employeeId.IdNumber}</span>
      </div>
    ),
  },
  {
    header: "IqamaExpireDate",
    accessor: (employeeId) => (
      <span className="text-sm font-semibold text-green-600">
        ${employeeId.IqamaExpireDate}
      </span>
    ),
  },
  {
    header: "TotalDaysRemaing",
    accessor: (employeeId) => (
      <span className="text-sm font-semibold text-green-600">
        ${employeeId.TotalDaysRemaing}
      </span>
    ),
  },
  {
    header: "department",
    accessor: (employeeId) => (
      <span className="text-sm capitalize">
        {employeeId.department?.toLowerCase()}
      </span>
    ),
  },
  {
    header: "position",
    accessor: (employeeId) => (
      <span className="text-sm capitalize">
        {employeeId.position?.toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (employee) => <StatusBadgeCell isDeleted={employee.isDeleted} />,
  },
];
