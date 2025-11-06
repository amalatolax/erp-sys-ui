import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationItem } from "../types";
import { LuLayoutDashboard } from "react-icons/lu";
import { MainRoutes } from "../data/route.data";
import { IoPeopleCircle } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { GrPaypal } from "react-icons/gr";
import { SiCashapp } from "react-icons/si";
import { MdDateRange } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { TiChartLine } from "react-icons/ti";
import { MdCoPresent } from "react-icons/md";

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
          {
            id: "attendance",
            name: "Attendance",
            path: "/employees/attendance",
          },
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
        icon: GrPaypal,
        path: "#",
        children: [
          { id: "payroll", name: "Employee Payroll", path: MainRoutes.employees },
          {
            id: "payments",
            name: "payments",
            path: "/employees/attendance",
          },
        ],
      },
      {
        id: "finance",
        name: "Finance",
        icon: SiCashapp,
        path: "#",
      },
      {
        id: "calander",
        name: "Calander",
        icon: MdDateRange,
        path: "#",
      },
      {
        id: "accounts",
        name: "Accounts",
        icon: MdAccountCircle,
        path: "#",
      },
      {
        id: "efficiency",
        name: "Efficiency",
        icon: TiChartLine,
        path: "#",
      },
      {
        id: "attendance",
        name: "Attendance",
        icon: MdCoPresent,
        path: "#",
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

  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false); // 🔹 NEW: collapse mode toggle

  const filteredNavigation = useMemo(() => {
    if (!searchTerm.trim()) return navigation;
    const lower = searchTerm.toLowerCase();
    return navigation.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.children?.some((sub: any) =>
          sub.name.toLowerCase().includes(lower)
        )
    );
  }, [searchTerm, navigation]);

  const highlightMatch = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return {
    navigation,
    handleMenuClick,
    location,
    isNavigateConfirmOpen,
    setIsNavigateConfirmOpen,
    searchTerm,
    setSearchTerm,
    activeMenu,
    setActiveMenu,
    isCollapsed,
    setIsCollapsed,
    filteredNavigation,
    highlightMatch,
  };
};

export default useSidebar;
