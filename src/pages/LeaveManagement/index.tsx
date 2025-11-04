import { useState, useMemo } from "react";
import { useLeaves } from "../../hooks/useLeaves";
import {
  CheckCircle,
  Clock,
  Filter,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import LeaveRequestList from "../../components/leave/LeaveRequestList";
import { LeaveRequest } from "../../types";
import StatsCards from "../../components/Reusable/StatsCard";

const LeaveManagement = () => {
  const {
    filteredLeaves,
    pendingLeaves,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    approveLeave,
    rejectLeave,
  } = useLeaves();

  const [activeTab, __setActiveTab] = useState<"all" | "pending">("all");
  const [sortOption, setSortOption] = useState<"date" | "name" | "status">(
    "date"
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  const displayLeaves = activeTab === "all" ? filteredLeaves : pendingLeaves;

  // 🔽 Apply filtering & sorting logic
  const processedLeaves = useMemo(() => {
    let leaves = [...displayLeaves];

    // 🗓️ Filter by selected date
    if (selectedDate) {
      const selected = new Date(selectedDate);
      leaves = leaves.filter(
        (leave) => new Date(leave.appliedDate) >= selected
      );
    }

    // 🔽 Sort by selected option
    switch (sortOption) {
      case "name":
        leaves.sort((a, b) =>
          a.employeeName.localeCompare(b.employeeName, "en", {
            sensitivity: "base",
          })
        );
        break;

      case "status":
        // Order: Pending > Approved > Rejected
        const order = { Pending: 1, Approved: 2, Rejected: 3 };
        leaves.sort(
          (a, b) => (order[a.status] || 99) - (order[b.status] || 99)
        );
        break;

      case "date":
      default:
        leaves.sort(
          (a, b) =>
            new Date(b.appliedDate).getTime() -
            new Date(a.appliedDate).getTime()
        );
        break;
    }

    return leaves;
  }, [displayLeaves, sortOption, selectedDate]);

  const totalRequests = filteredLeaves.length;
  const approvedLeaves = filteredLeaves.filter(
    (l) => l.status === "Approved"
  ).length;
  const pendingLeavesCount = filteredLeaves.filter(
    (l) => l.status === "Pending"
  ).length;
  const rejectedLeavesCount = filteredLeaves.filter(
    (l) => l.status === "Rejected"
  ).length;

  // Prepare stats card data
  const statsData = [
    {
      title: "Total Requests",
      value: totalRequests,
      subtitle: "All leave requests",
      icon: <Users className="w-7 h-7 text-blue-600" />,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Approved",
      value: approvedLeaves,
      subtitle: "Leaves approved",
      icon: <CheckCircle className="w-7 h-7 text-green-600" />,
      iconBg: "bg-green-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingLeavesCount,
      subtitle: "Leaves pending",
      icon: <Clock className="w-7 h-7 text-yellow-600" />,
      iconBg: "bg-yellow-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Rejected",
      value: rejectedLeavesCount,
      subtitle: "Leaves rejected",
      icon: <XCircle className="w-7 h-7 text-red-600" />,
      iconBg: "bg-red-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
        <p className="text-gray-600 mt-1">
          Manage employee leave requests and approvals
        </p>
      </div>

      <StatsCards data={statsData} />

      {/* 🔍 Search + Filter + Sort Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leave requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[130px] cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* 🗓️ Date Picker (Now Filters by Date) */}
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-3 pr-3 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[130px] cursor-pointer"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave Request List */}
      <LeaveRequestList
        leaves={processedLeaves}
        onApprove={approveLeave}
        onReject={rejectLeave}
        onRequestInfo={(leave: LeaveRequest) =>
          alert(
            `More info for ${leave.employeeName} - ${leave.leaveType} Leave`
          )
        }
      />
    </div>
  );
};

export default LeaveManagement;
