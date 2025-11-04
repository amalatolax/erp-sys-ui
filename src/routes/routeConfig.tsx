import { RouteObject } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import EmployeeMaster from "../pages/Employees";
import { MainRoutes } from "../data/route.data";
import LeaveManagement from "../pages/LeaveManagement";
import Reports from "../pages/Reports/Reports";
import Layout from "../Layout/Layout";
import EmployeeProfilePage from "../pages/EmployeeProfile";
import LoginPage from "../pages/Login";

export const routes: RouteObject[] = [
  {
    path: MainRoutes.login,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: MainRoutes.dashboard,
        element: <Dashboard />,
      },
      {
        path: MainRoutes.employees,
        element: <EmployeeMaster />,
      },
      {
        path: MainRoutes.employeeProfile,
        element: <EmployeeProfilePage />,
      },
      {
        path: MainRoutes.leaveManagement,
        element: <LeaveManagement />,
      },
      {
        path: MainRoutes.reports,
        element: <Reports />,
      },
      {
        path: MainRoutes.reports,
        element: <EmployeeProfilePage />,
      },
    ],
  },
];
