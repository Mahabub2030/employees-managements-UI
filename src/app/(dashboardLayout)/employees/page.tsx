import EmployeesManagementHeader from "@/components/modules/Employees/EmployeesManagementHeader";
import EmployeTable from "@/components/modules/Employees/EmployeTable";

import { getEmployees } from "@/components/services/admin/getEmployees";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { IEmployee } from "@/types/employee.interface";
import { Suspense } from "react";

export default async function EmployeePage() {
  const emolyeesResult = await getEmployees();
  return (
    <div className="space-y-6">
      <EmployeesManagementHeader />

      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search employee.." />
        <SelectFilter
          paramName="title"
          options={
            Array.isArray(emolyeesResult?.data)
              ? emolyeesResult.data.map((employee: IEmployee) => ({
                  label: employee?.title,
                  value: employee?.title,
                }))
              : []
          }
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <EmployeTable employees={emolyeesResult?.data?.map || []} />
        <TablePagination total={emolyeesResult?.total || 0} />
      </Suspense>
    </div>
  );
}
