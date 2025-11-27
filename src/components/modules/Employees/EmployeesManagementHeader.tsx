"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import EmployeeFormDialog from "./EmployeeFormDialog";

interface EmployeesManagementHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  employee?: any;
}

const EmployeesManagementHeader = ({
  employee,
}: EmployeesManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <EmployeeFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
        employee={employee}
      />

      <ManagementPageHeader
        title="Employees Management"
        description="Manage Employees information and details"
        action={{
          label: "Add Employee    ",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default EmployeesManagementHeader;
