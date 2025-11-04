import { useState } from "react";
import { useEmployees } from "../../hooks/useEmployees";
import { Users } from "lucide-react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import StatsCards from "../Reusable/StatsCard";
import { GrDocumentText } from "react-icons/gr";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { PiPrinterLight } from "react-icons/pi";
import EmployeeReportPDF from "../PDFs/EmployeeSummeryReportPDF";
import { Employee } from "../../types";
import { pdf } from "@react-pdf/renderer";
import { dummyEmployees } from "../../data/dummy.data";
import { generateEmployeeCSV } from "../CSVs/EmployeeSummeryCSV";
import { BsPersonPlus } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const EmployeeSummaryReport = () => {
  const { employees } = useEmployees();

  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const departments = Array.from(
    new Set(employees.map((emp) => emp.department))
  );

  const filteredEmployees =
    selectedDepartment === "All Departments"
      ? employees
      : employees.filter((e) => e.department === selectedDepartment);

  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(
    (e) => e.status === "Active"
  ).length;
  const newHires = filteredEmployees.filter(
    (e) => new Date(e.joinDate) >= new Date(startDate)
  ).length;
  const departmentCount = departments.length;

  // --- Department summary (male/female count)
  const departmentSummary = departments.map((dep) => {
    const deptEmployees = employees.filter((e) => e.department === dep);
    const male = deptEmployees.filter((e) => e.gender === "Male").length;
    const female = deptEmployees.filter((e) => e.gender === "Female").length;
    return {
      department: dep,
      male,
      female,
      total: male + female,
    };
  });

  // --- Chart data (stacked)
  const chartData = {
    labels: departmentSummary.map((d) => d.department),
    datasets: [
      {
        label: "Male",
        data: departmentSummary.map((d) => d.male),
        backgroundColor: "#4ade80",
        borderRadius: 2,
      },
      {
        label: "Female",
        data: departmentSummary.map((d) => d.female),
        backgroundColor: "#86efac",
        borderRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: { stacked: true, grid: { color: "#f3f4f6" } },
    },
  };

  const statsData = [
    {
      title: "Total Employees",
      value: totalEmployees,
      subtitle: "+2 this month",
      icon: <Users className="w-7 h-7 text-blue-600" />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      subtitle: `${((activeEmployees / employees.length) * 100).toFixed(
        0
      )}% of total`,
      icon: <BsPerson className="w-7 h-7 text-green-600" />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "New Hires",
      value: newHires,
      subtitle: "Currently away",
      icon: <BsPersonPlus className="w-7 h-7 text-purple-600" />,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Departments",
      value: departmentCount,
      subtitle: "Last 22 days",
      icon: <LuBuilding2 className="w-7 h-7 text-orange-600" />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const downloadEmployeeSummeryReport = async (employees: Employee[]) => {
    const blob = await pdf(
      <EmployeeReportPDF employees={employees} />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Employee-summery-report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg py-2.5 px-4 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
          >
            <option>All Departments</option>
            {departments.map((dep) => (
              <option key={dep}>{dep}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-8 pr-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => downloadEmployeeSummeryReport(dummyEmployees)}
          >
            <GrDocumentText size={14} color="red" />
            <p className="text-xs text-red-600 font-semibold">PDF</p>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => generateEmployeeCSV(dummyEmployees)}
          >
            <HiOutlineDocumentChartBar size={16} color="green" />
            <p className="text-xs text-green-600 font-semibold">CSV</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <PiPrinterLight size={20} color="blue" />
            <p className="text-xs text-blue-600 font-semibold">Print</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <StatsCards data={statsData} />

      {/* Department Chart + Summary Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Department-wise Employee Distribution
          </h3>
          <Bar data={chartData} options={chartOptions} height={200} />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Employee Summary by Department
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Department
                  </th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-700">
                    Male
                  </th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-700">
                    Female
                  </th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departmentSummary.map((dept) => (
                  <tr key={dept.department}>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {dept.department}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {dept.male}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {dept.female}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {dept.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummaryReport;
