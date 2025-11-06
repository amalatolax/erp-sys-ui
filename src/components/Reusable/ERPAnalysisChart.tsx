import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const ERPAnalyticsChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Production Output",
        data: [4200, 4800, 5100, 5300, 5900, 6200, 6100, 6400, 6700, 6900, 7100, 7500],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#16a34a",
        pointRadius: 4,
      },
      {
        label: "Operational Expenses",
        data: [2800, 3000, 3200, 3300, 3500, 3700, 3600, 3900, 4100, 4200, 4300, 4400],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#3b82f6",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
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
          <BarChart3 className="w-5 h-5 text-green-600" />
          Production vs Expenses
        </h2>
        <button className="text-sm text-green-700 hover:underline">
          View Details
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ERPAnalyticsChart;
