import { useState, useMemo } from "react";
import { Employee } from "../types";
import { dummyEmployees } from "../data/dummy.data";

export const useEmployees = () => {
  const [employees] = useState<Employee[]>(dummyEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, searchQuery, statusFilter]);

  const employeesByRole = useMemo(() => {
    const roleCount: Record<string, number> = {};
    employees.forEach((emp) => {
      roleCount[emp.role] = (roleCount[emp.role] || 0) + 1;
    });
    return Object.entries(roleCount).map(([role, count]) => ({ role, count }));
  }, [employees]);

  const employeesByDepartment = useMemo(() => {
    const deptCount: Record<string, number> = {};
    employees.forEach((emp) => {
      deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
    });
    return Object.entries(deptCount).map(([department, count]) => ({
      department,
      count,
    }));
  }, [employees]);

  return {
    employees,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    employeesByRole,
    employeesByDepartment,
  };
};
