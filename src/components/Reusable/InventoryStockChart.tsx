import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Boxes } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryStockChart = () => {
  const data = {
    labels: ["Fertilizer", "Seeds", "Machinery", "Fuel", "Chemicals", "Tools"],
    datasets: [
      {
        label: "In Stock (units)",
        data: [1200, 900, 450, 300, 650, 500],
        backgroundColor: "rgba(22, 163, 74, 0.7)", // Green
        borderColor: "rgba(22, 163, 74, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: "Reserved (units)",
        data: [400, 200, 100, 80, 120, 60],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Blue
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 8,
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
          color: "#475569",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#1f2937",
        bodyColor: "#374151",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#64748b" },
        grid: { color: "#e2e8f0", drawBorder: false },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Boxes className="w-5 h-5 text-green-600" />
          Inventory Stock Levels
        </h2>
        <button className="text-sm text-green-700 hover:underline">
          View Details
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default InventoryStockChart;
