"use client";
import { softDeleteEmployee } from "@/components/services/admin/getEmployees";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { IEmployee } from "@/types/employee.interface";
import { useState } from "react";
import { toast } from "sonner";
import EmployeeViewDetailDialog from "../Dashboard/admin/EmployeesViewDetailDialog";
import EmployeeFormDialog from "./EmployeeFormDialog";
import { employeesColumns } from "./employeesColumns";
import ManagementTable from "./ManagementTable";

export default function EmployeTable({
  employees,
}: {
  employees: IEmployee[];
}) {
  const [viewingEmployee, setViewingEmployee] = useState<IEmployee | null>(
    null
  );
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );
  const [deletingEmployee, setDeletingEmployee] = useState<IEmployee | null>(
    null
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const handleView = (employees: IEmployee) => {
    setViewingEmployee(employees);
  };
  const handleEdit = (employees: IEmployee) => {
    setEditingEmployee(employees);
  };

  const handleDelete = (employees: IEmployee) => {
    setDeletingEmployee(employees);
  };

  const confirmDelete = async () => {
    if (!deletingEmployee) return;

    setIsDeleting(true);
    const result = await softDeleteEmployee(deletingEmployee.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Employee deleted successfully");
      setDeletingEmployee(null);
    } else {
      toast.error(result.message || "Failed to delete employee");
    }
  };

  const employeesWithSerial = employees.map((emp, index) => ({
    ...emp,
    S_NO: index + 1,
  }));
  return (
    <>
      <ManagementTable
        data={employeesWithSerial}
        columns={employeesColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(employee) => employee.id!}
        emptyMessage="No employees found"
      />
      {/* Edit Employee Form Dialog */}
      <EmployeeFormDialog
        open={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onSuccess={() => {
          setEditingEmployee(null);
        }}
        employees={editingEmployee}
      />

      {/* View Employee Detail Dialog */}
      <EmployeeViewDetailDialog
        open={!!viewingEmployee}
        onClose={() => setViewingEmployee(null)}
        onSuccess={() => {
          setViewingEmployee(null);
        }}
        employee={viewingEmployee}
      />
      <DeleteConfirmationDialog
        open={!!deletingEmployee}
        onOpenChange={(open) => !open && setDeletingEmployee(null)}
        onConfirm={confirmDelete}
        title="Delete Employee"
        description={`Are you sure you want to delete ${deletingEmployee?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
