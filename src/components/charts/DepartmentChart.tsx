import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

interface DepartmentChartProps {
  data: { department: string; count: number }[];
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ data }) => {
  const [sortOption, setSortOption] = useState<"name" | "count">("name");

  // 🔽 Sort data
  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sortOption === "name") {
      sorted.sort((a, b) =>
        a.department.localeCompare(b.department, "en", { sensitivity: "base" })
      );
    } else {
      sorted.sort((a, b) => b.count - a.count);
    }
    return sorted;
  }, [data, sortOption]);

  // 🎨 Define colors (cycle through)
  const colors = [
    "#3b82f6", // blue
    "#22c55e", // green
    "#f59e0b", // amber
    "#06b6d4", // cyan
    "#ec4899", // pink
    "#8b5cf6", // violet
  ];

  // 📊 Chart.js Data
  const chartData = {
    labels: sortedData.map((d) => d.department),
    datasets: [
      {
        label: "Employees",
        data: sortedData.map((d) => d.count),
        backgroundColor: sortedData.map(
          (_, i) => colors[i % colors.length] + "90" // light opacity
        ),
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  // ⚙️ Chart Options
  const options = {
    indexAxis: "y" as const, // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#6b7280", font: { size: 11 } },
        beginAtZero: true,
      },
      y: {
        grid: { display: false },
        ticks: { color: "#374151", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Department-wise Employees
        </h2>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as "name" | "count")
            }
            className="appearance-none bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="count">Sort by Count</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1">
          View Department Report →
        </button>
      </div>
    </div>
  );
};

export default DepartmentChart;
