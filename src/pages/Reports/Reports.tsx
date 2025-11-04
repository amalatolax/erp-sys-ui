import { useState } from "react";
import EmployeeSummaryReport from "../../components/reports/EmployeeSummaryReport";
import LeaveBalanceReport from "../../components/reports/LeaveBalanceReport";

const Reports = () => {
  const [activeReport, setActiveReport] = useState<"employee" | "leave">(
    "employee"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">View and export employee reports</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 pt-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveReport("employee")}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeReport === "employee"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-green-600 hover:border-green-300"
              }`}
            >
              Employee Summary
            </button>

            <button
              onClick={() => setActiveReport("leave")}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                activeReport === "leave"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-green-600 hover:border-green-300"
              }`}
            >
              Leave Balance
            </button>
          </nav>
        </div>
      </div>

      {activeReport === "employee" ? (
        <EmployeeSummaryReport />
      ) : (
        <LeaveBalanceReport />
      )}
    </div>
  );
};

export default Reports;
