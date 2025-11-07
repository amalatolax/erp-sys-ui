import React, { useEffect } from "react";
import { Menu, X, Zap, ChevronRight, ArrowLeft, Search } from "lucide-react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import Logo from "../assets/Logo.png";
import { NavigationItem, SubChildrenType } from "../types";
import { Location } from "react-router-dom";
import { MdHelp } from "react-icons/md";

interface SidebarProps {
  isSidebarOpen: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  handleMenuClick: (item: NavigationItem | SubChildrenType) => void;
  location: Location;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  activeMenu: NavigationItem | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<NavigationItem | null>>;
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
  // State to track expanded levels in main sidebar
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );
  // State to track expanded levels in sub sidebar
  const [subExpandedItems, setSubExpandedItems] = React.useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setActiveMenu(null);
    setExpandedItems(new Set());
    setSubExpandedItems(new Set());
  }, [location.pathname, isSidebarOpen]);

  // Close all sidebars and expanded states
  const closeAllSidebars = () => {
    setActiveMenu(null);
    setExpandedItems(new Set());
    setSubExpandedItems(new Set());
  };

  // Toggle expansion of items in main sidebar - only one can be expanded at a time
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set<string>();
      // If the item is not currently expanded, expand it and close others
      if (!prev.has(itemId)) {
        newSet.add(itemId);
      }
      // If it was already expanded, the newSet will be empty (collapses all)
      return newSet;
    });

    // Close sub sidebar when expanding/collapsing main menu items
    setActiveMenu(null);
    setSubExpandedItems(new Set());
  };

  // Toggle expansion of items in sub sidebar
  const toggleSubExpanded = (itemId: string) => {
    setSubExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Check if item has children (up to 4 levels)
  const hasChildren = (item: NavigationItem | SubChildrenType): boolean => {
    return !!(item.children && item.children.length > 0);
  };

  // Check if item is active based on current path
  const isItemActive = (item: NavigationItem | SubChildrenType): boolean => {
    if (item.path === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
    );
  };

  // Handle main menu item click
  const handleMainMenuItemClick = (item: NavigationItem) => {
    if (hasChildren(item)) {
      toggleExpanded(item.id);
    } else {
      setActiveTab(item.id);
      handleMenuClick(item);
      closeSidebar();
      closeAllSidebars();
    }
  };

  // Handle level 2 menu item click
  const handleLevel2ItemClick = (
    parentItem: NavigationItem,
    child: SubChildrenType
  ) => {
    const hasGrandChildren = hasChildren(child);

    if (hasGrandChildren) {
      // Level 2 with children - open sub sidebar with the Level 2 item
      setActiveMenu({
        ...child,
        icon: parentItem.icon, // Keep parent icon for sub sidebar header
      } as NavigationItem);
    } else {
      // Level 2 without children - navigate directly
      setActiveTab(child.id);
      handleMenuClick(child);
      closeSidebar();
      closeAllSidebars();
    }
  };

  // Handle sub menu item click (levels 3 and 4)
  const handleSubMenuItemClick = (item: SubChildrenType) => {
    if (hasChildren(item)) {
      toggleSubExpanded(item.id);
    } else {
      setActiveTab(item.id);
      handleMenuClick(item);
      closeSidebar();
      closeAllSidebars();
    }
  };

  // Render main sidebar navigation items (levels 1 and 2)
  const renderMainNavigation = (items: NavigationItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      const hasChildItems = hasChildren(item);
      const isExpanded = expandedItems.has(item.id);
      const isActive = isItemActive(item);

      return (
        <div key={item.id} className="space-y-1">
          {/* Main level item */}
          <button
            onClick={() => handleMainMenuItemClick(item)}
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
            {!isCollapsed && hasChildItems && (
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
              />
            )}
          </button>

          {/* Level 2 children - only show when expanded and not collapsed */}
          {!isCollapsed && isExpanded && hasChildItems && item.children && (
            <div className="ml-6 space-y-1 border-l-2 border-gray-100 pl-2">
              {item.children.map((child) => {
                const hasGrandChildren = hasChildren(child);
                const isChildActive = isItemActive(child);

                return (
                  <div key={child.id}>
                    <button
                      onClick={() => handleLevel2ItemClick(item, child)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all ${
                        isChildActive
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{highlightMatch(child.name)}</span>
                      {hasGrandChildren && <ChevronRight className="w-3 h-3" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    });
  };

  // Render sub sidebar navigation (levels 3 and 4)
  const renderSubNavigation = (menu: NavigationItem) => {
    if (!menu.children) return null;

    return (
      <>
        {/* When expanded: regular sub sidebar */}
        {!isCollapsed ? (
          <aside className="fixed top-0 left-72 h-full w-64 bg-white border-r border-gray-200 z-50 shadow-lg transition-transform duration-300 mt-[65px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-green-600 text-sm">
                {menu.name}
              </span>
              <button
                onClick={closeAllSidebars}
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </button>
            </div>

            <div className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-60px)]">
              {menu.children.map((subItem) => {
                const hasSubChildren = hasChildren(subItem);
                const isSubExpanded = subExpandedItems.has(subItem.id);
                const isSubActive = isItemActive(subItem);

                return (
                  <div key={subItem.id} className="space-y-1">
                    {/* Level 3 item */}
                    <button
                      onClick={() => handleSubMenuItemClick(subItem)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all ${
                        isSubActive
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{highlightMatch(subItem.name)}</span>
                      {hasSubChildren && (
                        <ChevronRight
                          className={`w-3 h-3 transition-transform ${
                            isSubExpanded ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Level 4 children */}
                    {isSubExpanded && hasSubChildren && subItem.children && (
                      <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-2">
                        {subItem.children.map((grandChild) => {
                          const isGrandChildActive = isItemActive(grandChild);

                          return (
                            <button
                              key={grandChild.id}
                              onClick={() => handleSubMenuItemClick(grandChild)}
                              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                                isGrandChildActive
                                  ? "bg-green-50 text-green-700 font-semibold"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {highlightMatch(grandChild.name)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        ) : (
          /* When collapsed: floating submenu */
          <div className="fixed top-0 left-20 mt-[4rem] w-56 bg-white shadow-xl border border-gray-200 rounded-lg z-50 animate-fadeIn">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-semibold text-gray-800 text-sm">
                {menu.name}
              </span>
              <button
                onClick={closeAllSidebars}
                className="text-gray-500 hover:text-green-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 max-h-[60vh] overflow-y-auto space-y-1">
              {menu.children.map((subItem) => {
                const hasSubChildren = hasChildren(subItem);
                const isSubExpanded = subExpandedItems.has(subItem.id);
                const isSubActive = isItemActive(subItem);

                return (
                  <div key={subItem.id} className="space-y-1">
                    <button
                      onClick={() => handleSubMenuItemClick(subItem)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-all ${
                        isSubActive
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{highlightMatch(subItem.name)}</span>
                      {hasSubChildren && (
                        <ChevronRight
                          className={`w-3 h-3 transition-transform ${
                            isSubExpanded ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Level 4 children in collapsed mode */}
                    {isSubExpanded && hasSubChildren && subItem.children && (
                      <div className="ml-2 space-y-1 border-l-2 border-gray-100 pl-2">
                        {subItem.children.map((grandChild) => {
                          const isGrandChildActive = isItemActive(grandChild);

                          return (
                            <button
                              key={grandChild.id}
                              onClick={() => handleSubMenuItemClick(grandChild)}
                              className={`w-full text-left px-4 py-1 rounded-lg text-sm transition-all ${
                                isGrandChildActive
                                  ? "bg-green-50 text-green-700 font-semibold"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {highlightMatch(grandChild.name)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  };

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

          {/* Collapse Toggle */}
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
          {renderMainNavigation(filteredNavigation)}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-8 py-4 border-t border-gray-200 bg-white">
          <div className={`flex items-center gap-3`}>
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
      </aside>

      {/* --- SUB SIDEBAR --- */}
      {activeMenu && renderSubNavigation(activeMenu)}
    </div>
  );
};

export default Sidebar;
