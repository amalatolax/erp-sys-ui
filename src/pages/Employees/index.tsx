import { useState, useMemo } from "react";
import { useEmployees } from "../../hooks/useEmployees";
import { Search, Filter, Plus } from "lucide-react";
import EmployeeList from "../../components/employee/EmployeeList";
import { Employee } from "../../types";

const EmployeeMaster = () => {
  const { employees } = useEmployees(); // assuming hook returns all employees
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const onAddEmployee = () => {
    alert("Add Employee modal or navigation goes here");
  };

  //Filtering logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" || emp.department === departmentFilter;

      const matchesRole = roleFilter === "All" || emp.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
    });
  }, [employees, searchQuery, departmentFilter, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Employee Master Data
        </h1>
        <p className="text-gray-600 mt-1">
          Manage and view employee information
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section - Search */}
        <div className="flex-1 relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, ID, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:min-w-[300px] pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        {/* Right Section - Filters + Button */}
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Filter className="text-gray-400 w-5 h-5" />

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer min-w-[140px]"
          >
            <option value="All">All Department</option>
            <option value="Administration">Administration</option>
            <option value="Processing">Processing</option>
            <option value="Quality Control">Quality Control</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Tea Production">Tea Production</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer min-w-[130px]"
          >
            <option value="All">All Role</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Worker">Worker</option>
            <option value="Technician">Technician</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent cursor-pointer min-w-[120px]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>

          {/* Add Employee Button */}
          <button
            onClick={onAddEmployee}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <EmployeeList
            employees={filteredEmployees}
            selectedEmployee={selectedEmployee}
            onSelectEmployee={setSelectedEmployee}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeMaster;
