import { Employee } from "../../types";

export const generateEmployeeCSV = (employees: Employee[]) => {
  if (!employees || employees.length === 0) return;

  const headers = [
    "Employee ID",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Department",
    "Status",
    "Join Date",
    "Salary (Rs.)",
    "Documents",
  ];

  const rows = employees.map((emp) => [
    emp.id,
    emp.name,
    emp.email,
    emp.phone,
    emp.role,
    emp.department,
    emp.status,
    new Date(emp.joinDate).toLocaleDateString("en-GB"),
    emp.salary.toLocaleString("en-LK", { minimumFractionDigits: 2 }),
    emp.documents.map((doc) => `${doc.name} (${doc.type})`).join("; "),
  ]);

  // Combine headers + rows
  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => {
          // Escape double quotes and wrap values that contain commas
          const stringValue = String(value ?? "").replace(/"/g, '""');
          return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
        })
        .join(",")
    )
    .join("\n");

  // Trigger CSV download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Employee_Report_${
    new Date().toISOString().split("T")[0]
  }.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
