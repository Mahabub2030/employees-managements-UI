import { Fragment } from "react";
interface Employee {
  id: number;
  name: string;
  nabatatId: string;
  iqama: string;
  position: string;
  standardTime: number[];
  overtime: number[];
}
interface TimesheetTableProps {
  employees: Employee[];
  days: number[];
  handleHourChange: (
    employeeId: number,
    day: number,
    type: "standardTime" | "overtime",
    value: number
  ) => void;
  activePart: number;
  selectedMonth: number;
  selectedYear: number;
}
export const TimesheetTable = ({
  employees,
  days,
  handleHourChange,
  activePart,
  selectedMonth,
  selectedYear,
}: TimesheetTableProps) => {
  // Calculate total hours for an employee
  const calculateTotal = (
    employee: Employee,
    type: "standardTime" | "overtime"
  ) => {
    return employee[type].reduce((sum, hours) => sum + hours, 0);
  };
  // Determine if a day belongs to the current or next month
  const isNextMonth = (day: number) => {
    if (activePart === 1) return false;
    if (activePart === 3) return true;
    // For part 2, check if day is less than 15
    return day < 15;
  };
  // Get the actual date for display
  const getActualDate = (day: number, isNextMonth: boolean) => {
    const month = isNextMonth ? (selectedMonth + 1) % 12 : selectedMonth;
    const year =
      isNextMonth && selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    return new Date(year, month, day);
  };
  // Format date for column header
  const formatDateHeader = (day: number, isNextMonthDay: boolean) => {
    const date = getActualDate(day, isNextMonthDay);
    return `${day}-${date.toLocaleString("default", {
      month: "short",
    })}`;
  };
  // Check if a day is a weekend (Friday or Saturday in Saudi Arabia)
  const isWeekend = (day: number, isNextMonthDay: boolean) => {
    const date = getActualDate(day, isNextMonthDay);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6; // Friday (5) or Saturday (6)
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-center">SN</th>
            <th className="border p-2 text-center">NAME</th>
            <th className="border p-2 text-center">NABATAT ID</th>
            <th className="border p-2 text-center">IQAMA</th>
            <th className="border p-2 text-center">Position</th>
            {days.map((day) => (
              <th
                key={day}
                className={`border p-2 text-center ${
                  isWeekend(day, isNextMonth(day)) ? "bg-yellow-100" : ""
                }`}
              >
                {formatDateHeader(day, isNextMonth(day))}
              </th>
            ))}
            <th className="border p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <Fragment key={employee.id}>
              <tr>
                {index === 0 && (
                  <td
                    className="border p-2 text-center"
                    rowSpan={employees.length * 2}
                  >
                    {index + 1}
                  </td>
                )}
                {index > 0 && (
                  <td className="border p-2 text-center" rowSpan={2}>
                    {index + 1}
                  </td>
                )}
                <td className="border p-2" rowSpan={2}>
                  {employee.name}
                </td>
                <td className="border p-2 text-center" rowSpan={2}>
                  {employee.nabatatId}
                </td>
                <td className="border p-2 text-center" rowSpan={2}>
                  {employee.iqama}
                </td>
                <td className="border p-2 text-center" rowSpan={2}>
                  {employee.position}
                </td>
                <td className="border p-2 text-center bg-gray-100">ST</td>
                {days.map((day) => {
                  const dayIndex = day - 1;
                  const isWeekendDay = isWeekend(day, isNextMonth(day));
                  return (
                    <td
                      key={`st-${day}`}
                      className={`border p-0 text-center ${
                        isWeekendDay ? "bg-yellow-100" : ""
                      }`}
                    >
                      <input
                        type="number"
                        className="w-full h-full p-2 text-center focus:outline-none"
                        value={employee.standardTime[dayIndex]}
                        onChange={(e) =>
                          handleHourChange(
                            employee.id,
                            day,
                            "standardTime",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                  );
                })}
                <td className="border p-2 text-center font-bold">
                  {calculateTotal(employee, "standardTime")}
                </td>
              </tr>
              <tr>
                <td className="border p-2 text-center bg-gray-100">OT</td>
                {days.map((day) => {
                  const dayIndex = day - 1;
                  const isWeekendDay = isWeekend(day, isNextMonth(day));
                  return (
                    <td
                      key={`ot-${day}`}
                      className={`border p-0 text-center ${
                        isWeekendDay ? "bg-yellow-100" : ""
                      }`}
                    >
                      <input
                        type="number"
                        className="w-full h-full p-2 text-center focus:outline-none"
                        value={employee.overtime[dayIndex]}
                        onChange={(e) =>
                          handleHourChange(
                            employee.id,
                            day,
                            "overtime",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                  );
                })}
                <td className="border p-2 text-center font-bold">
                  {calculateTotal(employee, "overtime")}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
