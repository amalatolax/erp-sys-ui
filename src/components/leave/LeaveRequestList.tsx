import { Check, X, Info } from "lucide-react";
import { LeaveRequest } from "../../types";

interface LeaveRequestListProps {
  leaves: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onRequestInfo: (leave: LeaveRequest) => void;
}

const LeaveRequestList = ({
  leaves,
  onApprove,
  onReject,
  onRequestInfo,
}: LeaveRequestListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Leave Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
              Applied On
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {leaves.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-500">
                No leave requests found
              </td>
            </tr>
          ) : (
            leaves.map((leave) => (
              <tr key={leave.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={leave.employeeAvatar}
                    alt={leave.employeeName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {leave.employeeName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {leave.department}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {leave.leaveType} Leave
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="font-medium">{leave.duration} days</div>
                  <div className="text-xs text-gray-500">
                    {new Date(leave.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(leave.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(leave.appliedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    {leave.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onApprove(leave.id)}
                          className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onReject(leave.id)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onRequestInfo(leave)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
        {/* Left side — text */}
        <span>Showing 1 to 5 of 5 results</span>

        {/* Right side — pagination UI */}
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 rounded-md border border-gray-200 text-gray-400 bg-white cursor-not-allowed text-sm font-medium">
            Previous
          </button>
          <span className="px-4 py-1.5 rounded-md bg-green-600 text-white font-semibold text-sm">
            1
          </span>
          <button className="px-4 py-1.5 rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestList;
