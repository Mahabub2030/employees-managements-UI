"use client";

import { IEmployee } from "@/types/employee.interface";
import { employeesColumns } from "./employeesColumns";
import ManagementTable from "./ManagementTable";

export default function EmployeTable({
  employees,
}: {
  employees: IEmployee[];
}) {
  const handleView = (employee: IEmployee) => {
    console.log("View employee:", employee);
  };
  const handleEdit = (employee: IEmployee) => {
    console.log("Edit employee:", employee);
  };
  const handleDelete = (employee: IEmployee) => {
    console.log("Delete employee:", employee);
  };

  return (
    <>
      <ManagementTable
        data={employees}
        columns={employeesColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(employee) => employee.id!}
        emptyMessage="No employees found"
      />
    </>
  );
}
