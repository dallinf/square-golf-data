import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Shot } from "~/types/shot";

interface ShotScatterChartProps {
  shots: Shot[];
  selectedClub: string;
  selectedDate: string;
}

export function ShotScatterChart({
  shots,
  selectedClub,
  selectedDate,
}: ShotScatterChartProps) {
  const scatterData = shots
    .filter((shot) => selectedClub === "all" || shot.club === selectedClub)
    .filter(
      (shot) =>
        selectedDate === "all" ||
        new Date(shot.date).toISOString().split("T")[0] === selectedDate
    )
    .filter((shot) => shot.offlineDistance !== 0)
    .map((shot) => ({
      offlineDistance: shot.offlineDistance,
      totalDistance: shot.totalDistance,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="offlineDistance"
          type="number"
          domain={[-100, 100]}
          ticks={[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]}
          label={{
            value: "Offline Distance (yd)",
            position: "bottom",
            offset: 10,
          }}
          tick={{ fontSize: 12, dy: 5 }}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis
          dataKey="totalDistance"
          label={{
            value: "Total Distance (yd)",
            angle: -90,
            position: "insideLeft",
          }}
          type="number"
        />
        <Tooltip />
        <Scatter data={scatterData} fill="#aa7300" name="Individual Shots" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
