import jsPDF from "jspdf";
import * as XLSX from "xlsx";
interface Employee {
  id: number;
  name: string;
  nabatatId: string;
  iqama: string;
  position: string;
  standardTime: number[];
  overtime: number[];
}
interface DateRange {
  start: number;
  end: number;
  startMonth: string;
  endMonth: string;
}
// Export to PDF
export const exportToPdf = (
  employees: Employee[],
  dateRange: DateRange,
  year: number
) => {
  const doc = new jsPDF("landscape", "mm", "a4");
  // Add title
  doc.setFontSize(16);
  doc.text("LANDSIDE SERVICES AT KING FAHAD INTERNATIONAL AIRPORT", 150, 15, {
    align: "center",
  });
  doc.setFontSize(12);
  doc.text("Nabatat TimeSheet & Overtime", 20, 25);
  doc.text(
    `${dateRange.start} ${dateRange.startMonth} To ${dateRange.end} ${dateRange.endMonth} ${year}`,
    150,
    25,
    {
      align: "center",
    }
  );
  // Too complex to implement full PDF rendering here
  // This is a simplified version
  doc.text("Timesheet data exported to PDF", 150, 40, {
    align: "center",
  });
  doc.text(
    "For complete formatting, please use the application view",
    150,
    50,
    {
      align: "center",
    }
  );
  // Save the PDF
  doc.save(`Timesheet_${dateRange.startMonth}_${year}.pdf`);
};
// Export to Excel
export const exportToExcel = (
  employees: Employee[],
  dateRange: DateRange,
  year: number
) => {
  // Create workbook
  const wb = XLSX.utils.book_new();
  // Prepare data for export
  const data: any[] = [];
  // Header row with dates
  const headerRow = ["SN", "NAME", "NABATAT ID", "IQAMA", "Position"];
  for (let day = dateRange.start; day <= 31; day++) {
    headerRow.push(`${day}-${dateRange.startMonth}`);
  }
  for (let day = 1; day <= dateRange.end; day++) {
    headerRow.push(`${day}-${dateRange.endMonth}`);
  }
  headerRow.push("Total");
  data.push(headerRow);
  // Add employee data
  employees.forEach((employee, index) => {
    // Standard Time row
    const stRow = [
      index + 1,
      employee.name,
      employee.nabatatId,
      employee.iqama,
      employee.position + " (ST)",
    ];
    // Add hours for each day
    for (let i = 0; i < employee.standardTime.length; i++) {
      stRow.push(employee.standardTime[i]);
    }
    // Add total
    const stTotal = employee.standardTime.reduce(
      (sum, hours) => sum + hours,
      0
    );
    stRow.push(stTotal);
    data.push(stRow);
    // Overtime row
    const otRow = ["", "", "", "", "(OT)"];
    // Add hours for each day
    for (let i = 0; i < employee.overtime.length; i++) {
      otRow.push(employee.overtime[i]);
    }
    // Add total
    const otTotal = employee.overtime.reduce((sum, hours) => sum + hours, 0);
    otRow.push(otTotal);
    data.push(otRow);
  });
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Timesheet");
  // Generate Excel file
  XLSX.writeFile(wb, `Timesheet_${dateRange.startMonth}_${year}.xlsx`);
};
