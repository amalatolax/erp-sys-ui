import { IconType } from "react-icons";

export interface ChildrenType { id: string, name: string, path: string }

export interface NavigationItem {
  id: string;
  name: string;
  icon: IconType | string;
  path: string;
  children?: ChildrenType[]
  onClick?: () => void;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave";
  joinDate: string;
  avatar: string;
  salary: number;
  documents: {
    name: string;
    type: string;
    uploadedAt: string;
  }[];
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  leaveType: "Annual" | "Sick" | "Personal" | "Maternity" | "Unpaid";
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: string;
}
