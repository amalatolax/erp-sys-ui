import React, { useEffect } from "react";
import { Menu, X, Zap, ChevronRight, ArrowLeft, Search } from "lucide-react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
// import { dummyEmployees } from "../data/dummy.data";
import Logo from "../assets/Logo.png";
import { NavigationItem } from "../types";
import { Location } from "react-router-dom";
import { MdHelp } from "react-icons/md";

interface SidebarProps {
  isSidebarOpen: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  handleMenuClick: (item: NavigationItem) => void;
  location: Location;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeMenu: any;
  setActiveMenu: React.Dispatch<any>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  filteredNavigation: NavigationItem[];
  highlightMatch: (text: string) => string | (string | JSX.Element)[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setActiveTab,
  closeSidebar,
  toggleSidebar,
  handleMenuClick,
  location,
  searchTerm,
  setSearchTerm,
  activeMenu,
  setActiveMenu,
  isCollapsed,
  setIsCollapsed,
  filteredNavigation,
  highlightMatch,
}) => {
  // const employee = dummyEmployees[3];

  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname, isSidebarOpen]);

  return (
    <div>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                ABC Plantation
              </h1>
              <p className="text-xs text-gray-600">ERP System</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={closeSidebar}
        />
      )}

      {/* --- MAIN SIDEBAR --- */}
      <aside
        className={`fixed top-0 left-0 h-full ${
          isCollapsed ? "w-20" : "w-72"
        } bg-white border-r border-gray-200 z-40 transition-all duration-300
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div
          className={`px-4 ${
            isCollapsed ? "py-4" : "py-[10px]"
          } border-b border-gray-200 flex items-center justify-between`}
        >
          <div className="flex items-center gap-4">
            <img src={Logo} alt="ABC Logo" className="w-8 h-8 object-contain" />
            {!isCollapsed && (
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  ABC Plantation
                </h1>
                <p className="text-sm text-gray-600">ERP System</p>
              </div>
            )}
          </div>

          {/* 🔹 Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <FaAngleDoubleRight className="w-4 h-4 text-gray-500" />
            ) : (
              <FaAngleDoubleLeft className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Search (Hide when collapsed) */}
        {!isCollapsed && (
          <div className="px-4 py-3 border-b border-gray-100 relative">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        )}

        {/* Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-220px)] p-3 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const hasChildren =
              Array.isArray(item.children) && item.children.length > 0;

            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname === item.path ||
                  location.pathname.startsWith(`${item.path}/`);

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (hasChildren) {
                    setActiveMenu((prev: typeof activeMenu) =>
                      prev?.id === item.id ? null : item
                    );
                  } else {
                    setActiveMenu(null);
                    setActiveTab(item.id);
                    handleMenuClick(item);
                    closeSidebar();
                  }
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center" : "justify-between"
                } px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <div
                  className={`flex items-center gap-3 ${
                    isCollapsed && "justify-center"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{highlightMatch(item.name)}</span>}
                </div>
                {!isCollapsed && hasChildren && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer (Hide details when collapsed) */}
        {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "space-x-3"
            } bg-green-50 rounded-xl py-2 px-3 border border-green-100`}
          >
            <img
              src={employee?.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-green-200"
            />
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {employee?.name || "Employee"}
                </p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
            )}
          </div>
        </div> */}
        <div className="absolute bottom-0 left-0 right-0 px-8 py-4 border-t border-gray-200 bg-white">
          <div className={`flex items-center gap-3 `}>
            <MdHelp size={20} className="hover:text-green-600" />
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 hover:text-green-600">
                  Help
                </p>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </aside>

      {/* --- SUB SIDEBAR --- */}
      {activeMenu && (
        <>
          {/* When expanded: regular sub sidebar */}
          {!isCollapsed ? (
            <aside className="fixed top-0 left-72 h-full w-64 bg-white border-r border-gray-200 z-50 shadow-lg transition-transform duration-300 mt-[65px]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <span className="font-semibold text-green-600 text-sm">
                  {activeMenu.name}
                </span>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </button>
              </div>

              <div className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-60px)]">
                {activeMenu.children.map((sub: any) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveTab(sub.id);
                      handleMenuClick(sub);
                      closeSidebar();
                      setActiveMenu(null);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                      location.pathname === sub.path
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {highlightMatch(sub.name)}
                  </button>
                ))}
              </div>
            </aside>
          ) : (
            /* When collapsed: floating submenu */
            <div className="fixed top-0 left-20 mt-[4rem] w-56 bg-white shadow-xl border border-gray-200 rounded-lg z-50 animate-fadeIn">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800 text-sm">
                  {activeMenu.name}
                </span>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="text-gray-500 hover:text-green-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 max-h-[60vh] overflow-y-auto space-y-1">
                {activeMenu.children.map((sub: any) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setActiveTab(sub.id);
                      handleMenuClick(sub);
                      closeSidebar();
                      setActiveMenu(null);
                    }}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                      location.pathname === sub.path
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {highlightMatch(sub.name)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
