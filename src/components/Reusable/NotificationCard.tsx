import {
  Activity,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Users,
  Truck,
  ClipboardList,
  Warehouse,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Harvest report submitted",
    message: "Monthly tea leaf harvest data for Field A has been uploaded.",
    time: "2 hours ago",
    icon: <ClipboardList className="w-5 h-5 text-green-600" />,
  },
  {
    id: 2,
    title: "Stock level low",
    message: "Fertilizer inventory in Warehouse #2 is below the reorder threshold.",
    time: "4 hours ago",
    icon: <Warehouse className="w-5 h-5 text-yellow-600" />,
  },
  {
    id: 3,
    title: "New supplier invoice received",
    message: "Invoice #INV-2025-021 received from Ceylon Agro Suppliers.",
    time: "Yesterday",
    icon: <FileSpreadsheet className="w-5 h-5 text-blue-600" />,
  },
  {
    id: 4,
    title: "Worker attendance anomaly",
    message: "3 workers in Field B were absent without notice for 2 days.",
    time: "2 days ago",
    icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
  },
  {
    id: 5,
    title: "New transport request approved",
    message: "Lorry #TR-1098 assigned to deliver tea leaves to processing plant.",
    time: "3 days ago",
    icon: <Truck className="w-5 h-5 text-green-600" />,
  },
  {
    id: 6,
    title: "Payroll completed",
    message: "Wage processing for November batch completed successfully.",
    time: "4 days ago",
    icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 7,
    title: "New employee registered",
    message: "Tharindu Perera added to Field C workforce database.",
    time: "5 days ago",
    icon: <Users className="w-5 h-5 text-indigo-600" />,
  },
];

const ERPNotifications = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          System Notifications
        </h2>
        <button className="text-sm text-green-700 hover:underline">
          Mark all as read
        </button>
      </div>

      {/* Notification list */}
      <div className="flex flex-col divide-y divide-gray-100 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 transition-all cursor-pointer"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              {n.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900">{n.title}</p>
              <p className="text-xs text-gray-600">{n.message}</p>
              <span className="text-[11px] text-gray-400 mt-0.5">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERPNotifications;
