import { useMemo } from "react";

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  onLeave: number;
}

const generateAttendanceData = (): AttendanceData[] => {
  const data: AttendanceData[] = [];
  const baseDate = new Date("2025-10-01");

  for (let i = 0; i < 22; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);

    const totalEmployees = 10;

    const present = Math.floor(Math.random() * 3) + 8; // 8–10
    const maxOnLeave = totalEmployees - present;
    const onLeave = Math.floor(Math.random() * (maxOnLeave + 1)); // ensures sum ≤ 10
    const absent = totalEmployees - present - onLeave;

    data.push({
      date: date.toISOString().split("T")[0],
      present,
      absent,
      onLeave,
    });
  }

  return data;
};

export const useAttendance = () => {
  const attendanceData = useMemo(() => generateAttendanceData(), []);

  const attendanceSummary = useMemo(() => {
    const totalDays = attendanceData.length;
    const totalPresent = attendanceData.reduce(
      (sum, day) => sum + day.present,
      0
    );
    const totalAbsent = attendanceData.reduce(
      (sum, day) => sum + day.absent,
      0
    );
    const totalOnLeave = attendanceData.reduce(
      (sum, day) => sum + day.onLeave,
      0
    );

    return {
      totalDays,
      avgPresent: (totalPresent / totalDays).toFixed(1),
      avgAbsent: (totalAbsent / totalDays).toFixed(1),
      avgOnLeave: (totalOnLeave / totalDays).toFixed(1),
    };
  }, [attendanceData]);

  return {
    attendanceData,
    attendanceSummary,
  };
};
