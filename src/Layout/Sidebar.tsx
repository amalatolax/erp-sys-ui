import React, { useState, useMemo } from "react";
import { Menu, X, Zap, ChevronDown, ChevronRight, Search } from "lucide-react";
import useSidebar from "../hooks/useSidebar";
import { dummyEmployees } from "../data/dummy.data";
import Logo from "../assets/Logo.png";

interface SidebarProps {
  isSidebarOpen: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setActiveTab,
  closeSidebar,
  toggleSidebar,
}) => {
  const { navigation, handleMenuClick, location } = useSidebar();
  const employee = dummyEmployees[3];

  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSubmenu = (id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((menu) => menu !== id) : [...prev, id]
    );
  };

  // Filtered navigation (includes submenu matching)
  const filteredNavigation = useMemo(() => {
    if (!searchTerm.trim()) return navigation;

    const lower = searchTerm.toLowerCase();
    const mapped = navigation.map((item) => {
      const matchesParent = item.name.toLowerCase().includes(lower);
      const matchedChildren = item.children?.filter((sub) =>
        sub.name.toLowerCase().includes(lower)
      );

      if (matchesParent || (matchedChildren && matchedChildren.length > 0)) {
        return { ...item, children: matchedChildren || item.children };
      }
      return null;
    });

    return mapped.filter(
      (item): item is NonNullable<typeof mapped[number]> => item !== null
    );
  }, [searchTerm, navigation]);

  // Highlight matching text
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

  return (
    <div>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">ABC Plantation</h1>
              <p className="text-xs text-gray-600">ERP System</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="px-4 py-[10px] border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="ABC HRM Logo" className="w-8 h-8 object-contain" />
            <div>
              <h1 className="text-base font-bold text-gray-900">ABC Plantation</h1>
              <p className="text-sm text-gray-600">ERP System</p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="px-4 py-3 border-b border-gray-100 relative">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          />
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        </div>

        {/* Scrollable Navigation */}
        <div className="overflow-y-auto h-[calc(100vh-220px)] p-3 space-y-2">
          {filteredNavigation.length > 0 ? (
            <nav className="space-y-2">
              {filteredNavigation.map((item) => {
                const Icon = item?.icon;
                const isActive =
                  item?.path === "/"
                    ? location.pathname === "/"
                    : item?.path
                      ? location.pathname.startsWith(item.path)
                      : false;
                const isOpen = openMenus.includes(item?.id ?? "");
                const hasChildren = item?.children && item.children.length > 0;

                return (
                  <div key={item?.id}>
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleSubmenu(item.id);
                        } else {
                          setActiveTab(item?.id!);
                          closeSidebar();
                          handleMenuClick(item);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${isActive
                        ? "bg-green-100 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{highlightMatch(item?.name ?? "")}</span>
                      </div>
                      {hasChildren &&
                        (isOpen ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        ))}
                    </button>

                    {/* Submenu */}
                    {hasChildren && isOpen && (
                      <div className="ml-10 mt-1 space-y-1">
                        {item.children?.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveTab(sub.id);
                              closeSidebar();
                              handleMenuClick({ ...sub, icon: item.icon } as any);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all ${location.pathname === sub.path
                              ? "bg-green-50 text-green-600 font-semibold"
                              : "text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            {highlightMatch(sub.name)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          ) : (
            <div className="text-center text-sm text-gray-500 py-8">
              No menu items found.
            </div>
          )}
        </div>

        {/* Footer / Employee Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-4 bg-green-50/70 backdrop-blur-sm rounded-xl py-2 px-4 border border-green-100 shadow-sm">
            <img
              src={employee?.avatar || "/default-avatar.png"}
              alt={employee?.name || "Employee"}
              className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {employee?.name || "Employee Name"}
              </span>
              <span className="text-xs text-gray-500">Logged in</span>
            </div>
            <button className="ml-auto bg-green-100 hover:bg-green-200 text-green-700 font-medium text-sm px-3 py-1 rounded-lg transition-all">
              Profile
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
