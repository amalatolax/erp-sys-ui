export enum MainRoutes {
  login = "/login",
  signup = "/signup",
  dashboard = "/",
  employees = "/employees",
  employeeProfile = "/employees/:employeeId",
  leaveManagement = "/leaves-management",
  reports = "/reports",
  logout = MainRoutes.login,

  // Error Routes
  notFound = "/404",
  unauthorized = "/401",
  forbidden = "/403",
  internalServerError = "/500",
  badRequest = "/400",
  serviceUnavailable = "/503",
  gatewayTimeout = "/504",
  networkConnectTimeout = "/599",
}

export enum DynamicRoute {
  id = ":id",
  action = ":action",
  pageNumber = ":pageNumber",
}
