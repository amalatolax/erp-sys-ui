import { useState } from "react";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import useSidebar from "../hooks/useSidebar";

const Layout = () => {
  const {
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
  } = useSidebar();
  const [__activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setActiveTab={setActiveTab}
        closeSidebar={closeSidebar}
        toggleSidebar={toggleSidebar}
        handleMenuClick={handleMenuClick}
        location={location}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        filteredNavigation={filteredNavigation}
        highlightMatch={highlightMatch}
      />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div>
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <main className={`${isCollapsed ? "ml-[80px]" : "lg:ml-72"}  pt-16 lg:pt-0`}>
          <div className="p-6 lg:p-8 max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
