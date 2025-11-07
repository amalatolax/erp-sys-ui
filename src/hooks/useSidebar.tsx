import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MainRoutes } from "../data/route.data";
import { IoPeopleCircle } from "react-icons/io5";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { GrPaypal } from "react-icons/gr";
import { SiCashapp } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { TiChartLine } from "react-icons/ti";
import { MdCoPresent } from "react-icons/md";
import { NavigationItem } from "../types";

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
        id: "inventory",
        name: "Inventory",
        icon: IoPeopleCircle,
        path: MainRoutes.employees,
        children: [
          {
            id: "generalStoresHO",
            name: "General Stores - HO",
            path: MainRoutes.employees,
            children: [
              {
                id: "MISEstate",
                name: "MIS - Estate",
                path: MainRoutes.employees,
                children: [
                  {
                    id: "MISEstate",
                    name: "MIS - Estate",
                    path: MainRoutes.employees,
                  },
                  {
                    id: "headOfficeMIS/DashBoardHO",
                    name: "Head Office MIS/ Dash Board - HO",
                    path: "/employees/attendance",
                  },
                ],
              },
              {
                id: "headOfficeMIS/DashBoardHO",
                name: "Head Office MIS/ Dash Board - HO",
                path: "/employees/attendance",
              },
            ],
          },
          {
            id: "generalStoresEstate",
            name: "General Stores - Estate",
            path: "/employees/attendance",
          },
          {
            id: "centralPurchasingHO",
            name: "Central Purchasing - HO",
            path: MainRoutes.dailyHarvestForm,
          },
        ],
      },
      {
        id: "mIS",
        name: "MIS",
        icon: HiDocumentMagnifyingGlass,
        path: MainRoutes.leaveManagement,
        children: [
          { id: "MISEstate", name: "MIS - Estate", path: MainRoutes.employees },
          {
            id: "headOfficeMIS/DashBoardHO",
            name: "Head Office MIS/ Dash Board - HO",
            path: "/employees/attendance",
          },
        ],
      },
      {
        id: "payment",
        name: "Payment",
        icon: GrPaypal,
        path: "#",
        children: [
          {
            id: "executivePayrollHO",
            name: "Executive Payroll - HO",
            path: MainRoutes.employees,
          },
          {
            id: "Staff Payroll - Estate",
            name: "payments",
            path: "/employees/attendance",
          },
          {
            id: "staffPayrollEstate",
            name: "Staff Payroll - Estate",
            path: "/employees/attendance",
          },
          {
            id: "labourCheckRollEstate",
            name: "Labour Check Roll - Estate",
            path: "/employees/attendance",
          },
          {
            id: "outGrower/ContractPluckingModuleEstate",
            name: "Out Grower/ Contract Plucking Module - Estate",
            path: "/employees/attendance",
          },
          {
            id: "boughtLeafEstate",
            name: "Bought Leaf - Estate",
            path: "/employees/attendance",
          },
          {
            id: "gratuityModuleEstate",
            name: "Gratuity Module - Estate",
            path: "/employees/attendance",
          },
        ],
      },
      {
        id: "finance",
        name: "Finance",
        icon: SiCashapp,
        path: "#",
        children: [
          {
            id: "Accounts Payable - Estate",
            name: "Accounts Payable - Estate",
            path: MainRoutes.employees,
          },
          {
            id: "Accounts Payable - HO",
            name: "Accounts Payable - HO",
            path: "/employees/attendance",
          },
          {
            id: "Accounts Receivable - Estate",
            name: "Accounts Receivable - Estate",
            path: "/employees/attendance",
          },
          {
            id: "Accounts Receivable - HO",
            name: "Accounts Receivable - HO",
            path: "/employees/attendance",
          },
          {
            id: "Cash Book - Estate",
            name: "Cash Book - Estate",
            path: "/employees/attendance",
          },
          {
            id: "Cash Book - HO",
            name: "Cash Book - HO",
            path: "/employees/attendance",
          },
          {
            id: "General Ledger - Estate",
            name: "General Ledger - Estate",
            path: "/employees/attendance",
          },
          {
            id: "General Ledger - HO",
            name: "General Ledger - HO",
            path: "/employees/attendance",
          },
          {
            id: "Inter Estate Transactions (IET) - HO",
            name: "Inter Estate Transactions (IET) - HO",
            path: "/employees/attendance",
          },
          {
            id: "Monthly Accounts - Estate",
            name: "Monthly Accounts - Estate",
            path: "/employees/attendance",
          },
        ],
      },
      {
        id: "production",
        name: "Production",
        icon: MdAccountCircle,
        path: "#",
        children: [
          {
            id: "Estate Production - Estate",
            name: "Estate Production - Estate",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "budget",
        name: "Budget",
        icon: TiChartLine,
        path: "#",
        children: [
          {
            id: "Budget - Estate",
            name: "Budget - Estate",
            path: MainRoutes.employees,
          },
          {
            id: "Budget - HO",
            name: "Budget - HO",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "transport",
        name: "Transport",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Fleet Management - Estate",
            name: "Fleet Management - Estate",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "sales",
        name: "Sales",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Sales Tracker - HO",
            name: "Sales Tracker - HO",
            path: MainRoutes.employees,
          },
          {
            id: "Crop Ledger (Sales Tracker) - Estate",
            name: "Crop Ledger (Sales Tracker) - Estate",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "fixAsset",
        name: "FixAsset",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Fixed Assets - HO",
            name: "Fixed Assets - HO",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "forestry",
        name: "Forestry",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Timber Module - HO",
            name: "Timber Module - HO",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "cAM",
        name: "CAM",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Centralized Admin Panel - HO",
            name: "Centralized Admin Panel - HO",
            path: MainRoutes.employees,
          },
          {
            id: "Login/ Authentication / Authorization",
            name: "Login/ Authentication / Authorization",
            path: MainRoutes.employees,
          },
        ],
      },
      {
        id: "nursery",
        name: "Nursery",
        icon: MdCoPresent,
        path: "#",
      },
      {
        id: "fWC",
        name: "FWC",
        icon: MdCoPresent,
        path: "#",
        children: [
          {
            id: "Field Work and Cultivation",
            name: "Field Work and Cultivation",
            path: MainRoutes.employees,
          },
        ],
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
