import { useEmployees } from "../../hooks/useEmployees";
import { useAttendance } from "../../hooks/useAttendance";
import { Users, Briefcase, TrendingUp, Calendar } from "lucide-react";
import EmployeeRoleChart from "../../components/charts/EmployeeRoleChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import AttendanceChart from "../../components/charts/AttendanceChart";
import StatsCards from "../../components/Reusable/StatsCard";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your HRM overview
        </p>
      </div>

      <StatsCards data={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeRoleChart data={employeesByRole} />
        <DepartmentChart data={employeesByDepartment} />
      </div>

      <AttendanceChart data={attendanceData} />
    </div>
  );
};

export default Dashboard;
