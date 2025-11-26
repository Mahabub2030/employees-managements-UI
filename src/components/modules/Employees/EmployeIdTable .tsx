"use client";

import { IEmployeeId } from "@/types/employee.interface";
import { employeesIdColumns } from "./employeesIdColumns ";

export default function EmployeIdTable({
  employeesId,
}: {
  employeesId: IEmployeeId[];
}) {
  const handleView = (employeesId: IEmployeeId) => {
    console.log("View employee:", employeesId);
  };
  const handleEdit = (employeesId: IEmployeeId) => {
    console.log("Edit employee:", employeesId);
  };
  const handleDelete = (employeesId: IEmployeeId) => {
    console.log("Delete employee:", employeesId);
  };

  return (
    <>
      <EmployeIdTable
        data={employeesId}
        columns={employeesIdColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={employeesId}
        emptyMessage="No employees ID found"
      />
    </>
  );
}
