import { useNavigate } from "react-router-dom";

const QuickAccess = () => {
    const navigate = useNavigate();

    const items = [
        { title: "Payroll", icon: "💰", color: "bg-emerald-100", path: "/payroll" },
        { title: "Attendance", icon: "🕒", color: "bg-blue-100", path: "/attendance" },
        { title: "Leave Requests", icon: "🌿", color: "bg-yellow-100", path: "/leaves" },
        { title: "Reports", icon: "📊", color: "bg-purple-100", path: "/reports" },
        { title: "Employees", icon: "👥", color: "bg-pink-100", path: "/employees" },
        { title: "Tasks", icon: "🗂️", color: "bg-indigo-100", path: "/tasks" },
        { title: "Inventory", icon: "📦", color: "bg-orange-100", path: "/inventory" },
        { title: "Settings", icon: "⚙️", color: "bg-gray-100", path: "/settings" },
        { title: "Finance", icon: "💹", color: "bg-teal-100", path: "/finance" },
    ];

    return (
        <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Quick Access</h2>
            </div>

            {/* Scrollable container */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                <div className="flex gap-2 min-w-max pb-2">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            onClick={() => navigate(item.path)}
                            className={`flex-shrink-0 w-36 h-16 sm:w-36 sm:h-16 ${item.color} rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm flex flex-col items-center justify-center`}
                        >
                            <div className="flex items-center gap-2">
                                <div className="text-xl mb-1">{item.icon}</div>
                                <p className="font-semibold text-gray-800 text-sm text-center leading-tight">
                                    {item.title}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuickAccess;
