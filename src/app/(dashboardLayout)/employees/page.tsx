import EmployeesManagementHeader from "@/components/modules/Employees/EmployeesManagementHeader";
import EmployeTable from "@/components/modules/Employees/EmployeTable";
import { getEmployees } from "@/components/services/admin/getEmployees";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { IEmployee } from "@/types/employee.interface";
import { Suspense } from "react";

export default async function EmployeePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const emolyeesResult = await getEmployees(queryString);

  const totalPages = Math.ceil(
    emolyeesResult?.meta?.total / emolyeesResult?.meta?.limit
  );
  console.log(emolyeesResult);

  return (
    <div className="space-y-6   rounded-4xl">
      <EmployeesManagementHeader />

      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search employee.." />
        <SelectFilter
          paramName="idNumber"
          options={
            Array.isArray(emolyeesResult?.data?.data)
              ? emolyeesResult.data.data.map((employee: IEmployee) => ({
                  label: employee?.name,
                  value: employee?.idNumber,
                }))
              : []
          }
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <EmployeTable
          employees={
            Array.isArray(emolyeesResult?.data?.data)
              ? emolyeesResult.data.data
              : []
          }
        />
        <TablePagination
          currentPage={emolyeesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
