interface TimesheetHeaderProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  dateRange: {
    start: number;
    end: number;
    startMonth: string;
    endMonth: string;
  };
}
export const TimesheetHeader = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  dateRange,
}: TimesheetHeaderProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    {
      length: 5,
    },
    (_, i) => selectedYear - 2 + i
  );
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/image.png" alt="Company Logo" className="h-12" />
          <h1 className="text-xl font-bold">DACO</h1>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold">
            LANDSIDE SERVICES AT KING FAHAD INTERNATIONAL AIRPORT
          </h1>
          <h2 className="text-lg">Shoeib Abou Zeid Mahmoud Awad</h2>
          <h3 className="text-md">Airport N & S</h3>
        </div>
        <div className="flex items-center space-x-2">
          <img src="/image.png" alt="Company Logo" className="h-12" />
          <h1 className="text-xl font-bold">NABATAT</h1>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Nabatat TimeSheet & Overtime</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="font-medium">Month:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-medium">Year:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="text-lg font-medium">
            {dateRange.start} {dateRange.startMonth} To {dateRange.end}{" "}
            {dateRange.endMonth}{" "}
            {dateRange.startMonth !== dateRange.endMonth ? selectedYear : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
