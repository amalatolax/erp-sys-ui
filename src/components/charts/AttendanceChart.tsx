import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AttendanceData } from "../../hooks/useAttendance";
import { ChevronDown } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Title
);

interface AttendanceChartProps {
  data: AttendanceData[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const displayData = data.slice(-7); // Last 7 days

  // Convert "present" counts (8–10) to % (e.g., 80–100%)
  const totalEmployees = 10;
  const attendancePercentages = displayData.map(
    (d) => (d.present / totalEmployees) * 100
  );

  const labels = displayData.map((d) =>
    new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
  );

  // Average attendance
  const avgAttendance =
    attendancePercentages.reduce((a, b) => a + b, 0) /
    attendancePercentages.length;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Attendance",
        data: attendancePercentages,
        fill: true,
        tension: 0.4,
        borderColor: "#3B82F6", // Tailwind blue-500
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => `Attendance: ${context.parsed.y.toFixed(0)}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
        },
      },
      y: {
        min: 80,
        max: 100,
        grid: { color: "#f3f4f6" },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
          stepSize: 5,
          callback: (value: any) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Attendance Trend</h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 rounded-lg py-1.5 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
            <option>This Week</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-4 text-sm text-gray-600 flex justify-end">
        <span>
          Avg Attendance:{" "}
          <span className="font-semibold text-green-600">
            {avgAttendance.toFixed(0)}%
          </span>
        </span>
      </div>
    </div>
  );
};

export default AttendanceChart;
