import { Shot } from "~/types/shot";

export const calculateMedian = (shots: Shot[]): number => {
  const speeds = shots.map((shot) => shot.ballSpeed).sort((a, b) => a - b);
  const mid = Math.floor(speeds.length / 2);
  return speeds.length % 2 === 0
    ? (speeds[mid - 1] + speeds[mid]) / 2
    : speeds[mid];
};

export const calculateAveragesByDate = (shots: Shot[], club: string) => {
  const grouped = shots
    .filter((shot) => club === "all" || shot.club === club)
    .reduce((acc, shot) => {
      const dateStr = new Date(shot.date).toISOString().split("T")[0];
      if (!acc[dateStr]) {
        acc[dateStr] = {
          speeds: [],
          date: dateStr,
          timeSinceEpoch: shot.timeSinceEpoch,
          totalDistance: [],
          carryDistance: [],
          offlineDistance: [],
        };
      }
      acc[dateStr].speeds.push(shot.ballSpeed);
      acc[dateStr].totalDistance.push(shot.totalDistance);
      acc[dateStr].carryDistance.push(shot.carryDistance);
      acc[dateStr].offlineDistance.push(shot.offlineDistance);
      return acc;
    }, {} as Record<string, { speeds: number[]; date: string; timeSinceEpoch: number; totalDistance: number[]; carryDistance: number[]; offlineDistance: number[] }>);

  return Object.entries(grouped)
    .map(([date, data]) => {
      const speeds = data.speeds.sort((a, b) => a - b);
      const mid = Math.floor(speeds.length / 2);
      const medianSpeed =
        speeds.length % 2 === 0
          ? (speeds[mid - 1] + speeds[mid]) / 2
          : speeds[mid];

      return {
        date,
        timeSinceEpoch: data.timeSinceEpoch,
        averageSpeed:
          speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length,
        medianSpeed,
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
};
