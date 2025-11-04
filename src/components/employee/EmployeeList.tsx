import { Eye, Edit2, Trash2 } from "lucide-react";
import { Employee } from "../../types";
import { useNavigate } from "react-router-dom";

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
}

const EmployeeList = ({
  employees,
  selectedEmployee,
  onSelectEmployee,
}: EmployeeListProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Employee List</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500 text-sm"
                >
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className={`hover:bg-gray-50 transition-all ${
                    selectedEmployee?.id === employee.id
                      ? "bg-blue-50"
                      : "bg-white"
                  }`}
                >
                  {/* Employee Info */}
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onSelectEmployee(employee)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {employee.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {employee.department}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {employee.role}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap truncate max-w-[200px]">
                    {employee.email}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/employees/${employee.id}`, {
                            state: { mode: "view" },
                          })
                        }
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/employees/${employee.id}/edit`)
                        }
                        className="text-green-500 hover:text-green-700 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          console.log("Delete employee:", employee.id)
                        }
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
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

export default EmployeeList;
