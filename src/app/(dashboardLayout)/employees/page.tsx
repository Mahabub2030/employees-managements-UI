import EmployeesManagementHeader from "@/components/modules/Employees/EmployeesManagementHeader";
import { getEmployees } from "@/components/services/admin/getEmployees";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { IEmployee } from "@/types/employee.interface";

export default async function EmployeePage() {
  const emolyeesResult = await getEmployees();
  return (
    <div className="space-y-6">
      <EmployeesManagementHeader />

      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="speciality" // ?speciality="Cardiology"
          options={emolyeesResult.data.map((employee: IEmployee) => ({
            label: employee.title,
            value: employee.title,
          }))}
          placeholder="Filter by speciality"
        />
        <RefreshButton />
      </div>
    </div>
  );
}
