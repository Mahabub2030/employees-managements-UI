import EmployeeFormDialog from "../Employees/EmployeeFormDialog";
import { employeesColumns } from "../Employees/employeesColumns";

export default function AddEmployeeComponents() {
  return (
    <div>
      <EmployeeFormDialog employee={employeesColumns} />
    </div>
  );
}
