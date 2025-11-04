import { useEmployees } from "../../hooks/useEmployees";
import { useLeaves } from "../../hooks/useLeaves";
import { Calendar, TrendingUp, Clock } from "lucide-react";

interface EmployeeLeaveBalance {
  employeeId: string;
  employeeName: string;
  department: string;
  totalLeaves: number;
  annualUsed: number;
  sickUsed: number;
  personalUsed: number;
  pendingLeaves: number;
  annualBalance: number;
  sickBalance: number;
}

const LeaveBalanceReport = () => {
  const { employees } = useEmployees();
  const { leaveRequests } = useLeaves();

  const annualAllowance = 20;
  const sickAllowance = 10;

  const leaveBalances: EmployeeLeaveBalance[] = employees.map((emp) => {
    const employeeLeaves = leaveRequests.filter(
      (leave) => leave.employeeId === emp.id && leave.status === "Approved"
    );
    const pendingLeaves = leaveRequests.filter(
      (leave) => leave.employeeId === emp.id && leave.status === "Pending"
    ).length;

    const annualUsed = employeeLeaves
      .filter((leave) => leave.leaveType === "Annual")
      .reduce((sum, leave) => sum + leave.duration, 0);

    const sickUsed = employeeLeaves
      .filter((leave) => leave.leaveType === "Sick")
      .reduce((sum, leave) => sum + leave.duration, 0);

    const personalUsed = employeeLeaves
      .filter((leave) => leave.leaveType === "Personal")
      .reduce((sum, leave) => sum + leave.duration, 0);

    return {
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      totalLeaves: employeeLeaves.reduce(
        (sum, leave) => sum + leave.duration,
        0
      ),
      annualUsed,
      sickUsed,
      personalUsed,
      pendingLeaves,
      annualBalance: annualAllowance - annualUsed,
      sickBalance: sickAllowance - sickUsed,
    };
  });

  const totalAnnualUsed = leaveBalances.reduce(
    (sum, emp) => sum + emp.annualUsed,
    0
  );
  const totalSickUsed = leaveBalances.reduce(
    (sum, emp) => sum + emp.sickUsed,
    0
  );
  const totalPersonalUsed = leaveBalances.reduce(
    (sum, emp) => sum + emp.personalUsed,
    0
  );
  const avgLeavesPerEmployee = (
    leaveBalances.reduce((sum, emp) => sum + emp.totalLeaves, 0) /
    employees.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Annual Leaves</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalAnnualUsed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sick Leaves</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSickUsed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Personal Leaves</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalPersonalUsed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg per Employee</p>
              <p className="text-2xl font-bold text-gray-900">
                {avgLeavesPerEmployee}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Leave Balance by Employee
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Annual Allowance: {annualAllowance} days | Sick Allowance:{" "}
            {sickAllowance} days
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Employee
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Annual Used
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Annual Balance
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Sick Used
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Sick Balance
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Personal
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-700">
                  Pending
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">
                  Total Used
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaveBalances.map((balance) => (
                <tr
                  key={balance.employeeId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-sm text-gray-900">
                      {balance.employeeName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {balance.employeeId}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {balance.department}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                      {balance.annualUsed}
                      <Clock className="w-3 h-3 text-gray-400" />
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        balance.annualBalance > 10
                          ? "bg-green-100 text-green-800"
                          : balance.annualBalance > 5
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {balance.annualBalance} days
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                      {balance.sickUsed}
                      <Clock className="w-3 h-3 text-gray-400" />
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        balance.sickBalance > 5
                          ? "bg-green-100 text-green-800"
                          : balance.sickBalance > 2
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {balance.sickBalance} days
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-gray-600">
                    {balance.personalUsed}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {balance.pendingLeaves > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {balance.pendingLeaves}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right text-sm font-semibold text-gray-900">
                    {balance.totalLeaves} days
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalanceReport;
