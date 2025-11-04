import { useState, useMemo } from "react";
import { dummyLeaveRequests } from "../data/dummy.data";
import { LeaveRequest } from "../types";

export const useLeaves = () => {
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(dummyLeaveRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });

  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((leave) => {
      const matchesSearch =
        leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || leave.status === statusFilter;

      const matchesDateRange =
        (!dateRange.start || leave.startDate >= dateRange.start) &&
        (!dateRange.end || leave.endDate <= dateRange.end);

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [leaveRequests, searchQuery, statusFilter, dateRange]);

  const pendingLeaves = useMemo(() => {
    return leaveRequests.filter((leave) => leave.status === "Pending");
  }, [leaveRequests]);

  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Approved" as const } : leave
      )
    );
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "Rejected" as const } : leave
      )
    );
  };

  return {
    leaveRequests,
    filteredLeaves,
    pendingLeaves,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    approveLeave,
    rejectLeave,
  };
};
