import { useEmployees } from "../../hooks/useEmployees";
import { useAttendance } from "../../hooks/useAttendance";
import {
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  Filter,
  ChevronDown,
} from "lucide-react";
import EmployeeRoleChart from "../../components/charts/EmployeeRoleChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import AttendanceChart from "../../components/charts/AttendanceChart";
import StatsCards from "../../components/Reusable/StatsCard";
import Spinner from "../../components/Reusable/Spinner";
import { useEffect, useRef, useState } from "react";
import NotificationCard from "../../components/Reusable/NotificationCard";
import ERPAnalyticsChart from "../../components/Reusable/ERPAnalysisChart";
import InventoryStockChart from "../../components/Reusable/InventoryStockChart";

const Dashboard = () => {
  const { employees, employeesByRole, employeesByDepartment } = useEmployees();
  const { attendanceData, attendanceSummary } = useAttendance();

  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;
  const onLeaveEmployees = employees.filter(
    (emp) => emp.status === "On Leave"
  ).length;

  const statsData = [
    {
      title: "Total Employees",
      value: employees.length,
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
      icon: <Briefcase className="w-7 h-7 text-green-600" />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "On Leave",
      value: onLeaveEmployees,
      subtitle: "Currently away",
      icon: <Calendar className="w-7 h-7 text-orange-600" />,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Avg Attendance",
      value: attendanceSummary.avgPresent,
      subtitle: "Last 22 days",
      icon: <TrendingUp className="w-7 h-7 text-cyan-600" />,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-600",
    },
  ];

  const [loading, __setLoading] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* --- Dashboard Header with Filter --- */}
      <div className="flex items-center justify-between -mt-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>

        {/* Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
          >
            <Filter className="w-4 h-4 text-green-600" />
            {selectedFilter}
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {["All", "Payroll", "Checkroll", "Inventory", "Attendance"].map(
                (option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-green-50 ${
                      selectedFilter === option
                        ? "text-green-700 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsDropdownOpen(false); // ✅ Close on select
                    }}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- Stats --- */}
      <StatsCards data={statsData} />

      {/* --- First Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ERPAnalyticsChart />
        <NotificationCard />
      </div>

      {/* --- Second Row --- */}
      <InventoryStockChart />

      {/* --- Third Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeRoleChart data={employeesByRole} />
        <DepartmentChart data={employeesByDepartment} />
      </div>

      {/* --- Attendance --- */}
      <AttendanceChart data={attendanceData} />
    </div>
  );
};

export default Dashboard;
