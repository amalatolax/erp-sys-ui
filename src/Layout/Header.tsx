import { Bell, Settings } from "lucide-react";
import React from "react";
import ProfileAvatarImg from "../assets/profile_avatar.png"

interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen }) => {
    return (
        <header
            className={`hidden lg:flex sticky top-0 h-[65px] bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-30 transition-all duration-300 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-72"
                } w-[calc(100%-18rem)]`} // 👈 ensures full width minus sidebar (72 = 18rem)
        >
            <div className="h-full w-full px-6 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-2">
                    {/* <div className="p-2 bg-green-50 rounded-lg">
                        <Sprout className="text-green-600" size={24} />
                    </div>
                    <h1 className="text-slate-900 text-xl font-bold tracking-tight">
                        Plantation ERP
                    </h1> */}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-all hover:scale-105 relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-all hover:scale-105">
                        <Settings size={20} />
                    </button>

                    <div className="flex items-center gap-2 pl-3 pr-4 border-l border-slate-200">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                            <img src={ProfileAvatarImg} alt="" />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-slate-700 text-sm font-medium hidden xl:inline">
                                David Kim
                            </span>
                            <span className="text-slate-400 text-xs font-medium hidden xl:inline">
                                Admin
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
