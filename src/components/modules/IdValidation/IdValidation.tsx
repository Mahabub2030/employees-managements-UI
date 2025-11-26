import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

import { getEmployeesId } from "@/services/employeeManagement";

import { IEmployeeId } from "@/types/employee.interface";
import { Suspense } from "react";
import { employeesIdColumns } from "../Employees/employeesIdColumns ";
import IdTable from "../table/IDTable";

export default async function IdValidation() {
  const emolyeesIdReusl = await getEmployeesId();

  const totalPages = Math.ceil(
    emolyeesIdReusl?.meta?.total / emolyeesIdReusl?.meta?.limit
  );
  return (
    <div className="space-y-6">
      <h1 className="font-mono font-bold">ID Validation</h1>

      <div className="flex space-x-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search employeeID.."
        />
        <SelectFilter
          paramName="title"
          options={
            Array.isArray(emolyeesIdReusl?.employeesId)
              ? emolyeesIdReusl.employeesId.map((employeeID: IEmployeeId) => ({
                  label: employeeID?.title,
                  value: employeeID?.title,
                }))
              : []
          }
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <IdTable
          data={emolyeesIdReusl?.employeesId ?? []}
          columns={employeesIdColumns}
        />
        <TablePagination
          currentPage={emolyeesIdReusl?.meta?.page ?? 1}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
}
