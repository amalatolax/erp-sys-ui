import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "../types";
import { LuLayoutDashboard } from "react-icons/lu";
import { MainRoutes } from "../data/route.data";
import { IoPeopleCircle } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

const useSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isNavigateConfirmOpen, setIsNavigateConfirmOpen] = useState(false);

  const navigation: NavigationItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        name: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/",
      },
      {
        id: "employees",
        name: "Employees",
        icon: IoPeopleCircle,
        path: MainRoutes.employees,
        children: [
          { id: "list", name: "Employee List", path: MainRoutes.employees },
          { id: "attendance", name: "Attendance", path: "/employees/attendance" },
        ],
      },
      {
        id: "leaves",
        name: "Leaves",
        icon: HiDocumentMagnifyingGlass,
        path: MainRoutes.leaveManagement,
      },
      {
        id: "reports",
        name: "Reports",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "payroll",
        name: "Payroll",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "finance",
        name: "Finance",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "calander",
        name: "Calander",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "accounts",
        name: "Accounts",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "efficiency",
        name: "Efficiency",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
      {
        id: "attendance",
        name: "Attendance",
        icon: BiSolidReport,
        path: MainRoutes.reports,
      },
    ],
    []
  );

  const handleMenuClick = useCallback(
    (item: NavigationItem) => {
      //   if (item.id === "logout") {
      //     setIsConfirmOpen(true);
      //   } else {
      //     navigate(item.path);
      //   }

      navigate(item.path);
    },
    [navigate]
  );

  return {
    navigation,
    handleMenuClick,
    location,
    isNavigateConfirmOpen,
    setIsNavigateConfirmOpen,
  };
};

export default useSidebar;
