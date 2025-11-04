import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChevronDown } from "lucide-react";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface EmployeeRoleChartProps {
  data: { role: string; count: number }[];
}

const EmployeeRoleChart = ({ data }: EmployeeRoleChartProps) => {
  const colors = [
    "rgb(132, 204, 22)", // green-500 (Field Workers)
    "rgb(59, 130, 246)", // blue-500 (Supervisors)
    "rgb(163, 163, 163)", // gray-400 (Management)
    "rgb(190, 242, 100)", // light green (Admin Staff)
  ];

  const chartData = {
    labels: data.map((item) => item.role),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data.map((_, i) => colors[i % colors.length]),
        borderWidth: 0,
        cutout: "70%", // makes it a donut
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "rgb(55, 65, 81)", // gray-700
        },
      },
      tooltip: {
        backgroundColor: "rgb(255, 255, 255)",
        titleColor: "rgb(17, 24, 39)",
        bodyColor: "rgb(17, 24, 39)",
        borderColor: "rgb(229, 231, 235)",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed} employees`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Employee Distribution by Role
        </h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
            <option>All Branches</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      <div className="h-64">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmployeeRoleChart;
