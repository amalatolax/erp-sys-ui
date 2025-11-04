import React from "react";

interface StatsCardData {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string; // background color for icon container
  iconColor: string; // icon color
  textColor?: string; // color for subtitle if needed
}

interface StatsCardsProps {
  data: StatsCardData[];
  className?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ data, className }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {data.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {card.value}
              </p>
              {card.subtitle && (
                <p
                  className={`text-xs font-semibold mt-1 ${
                    card.textColor || "text-green-500"
                  }`}
                >
                  {card.subtitle}
                </p>
              )}
            </div>
            <div className={`${card.iconBg} p-3 rounded-lg -mt-4`}>{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
