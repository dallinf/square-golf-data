import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  timeSinceEpoch: number;
  medianSpeed: number;
}

interface BallSpeedChartProps {
  chartData: ChartData[];
}

export function BallSpeedChart({ chartData }: BallSpeedChartProps) {
  return (
    <div className="mb-12 h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Ball Speed Trends</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timeSinceEpoch"
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
            tickCount={10}
            domain={["dataMin", "dataMax"]}
            type="number"
          />
          <YAxis
            label={{
              value: "Ball Speed (mph)",
              angle: -90,
              position: "insideLeft",
            }}
            tick={{ fontSize: 12 }}
            domain={([dataMin, dataMax]) => {
              const min = Math.floor(dataMin / 5) * 5;
              const max = Math.ceil(dataMax / 5) * 5;
              return [min, max];
            }}
            allowDecimals={false}
            type="number"
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(1)} mph`,
              "Ball Speed",
            ]}
            labelFormatter={(date) =>
              new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }
            label={() => "Date"}
          />
          <Legend />
          <Line
            type="linear"
            dataKey="medianSpeed"
            stroke="#82ca9d"
            name="Median Speed"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
