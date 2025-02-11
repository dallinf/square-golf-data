import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { BallSpeedChart } from "~/components/BallSpeedChart";
import { ShotScatterChart } from "~/components/ShotScatterChart";
import { calculateAveragesByDate } from "~/utils/shotCalculations";
import { ShotDetailsTable } from "~/components/ShotDetailsTable";
import { CsvUploadForm } from "~/components/CsvUploadForm";

// Add interface for Shot data
interface Shot {
  club: string;
  index: number;
  ballSpeed: number;
  carryDistance: number;
  totalDistance: number;
  offlineDistance: number;
  filename: string;
  place: string;
  date: Date;
  timeSinceEpoch: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Square Golf Shot Data" },
    { name: "description", content: "Welcome to Square Golf Shot Data" },
  ];
};

export default function Index() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [selectedClub, setSelectedClub] = useState<string>("i7");
  const [selectedDate, setSelectedDate] = useState<string>("all");

  const uniqueClubs = Array.from(
    new Set(shots.map((shot) => shot.club))
  ).sort();

  const uniqueDates = Array.from(
    new Set(
      shots
        .filter((shot) => selectedClub === "all" || shot.club === selectedClub)
        .map((shot) => new Date(shot.date).toISOString().split("T")[0])
    )
  )
    .sort()
    .reverse();

  // Group shots by club and date
  const groupedShots = Object.values(
    shots
      .filter((shot) => selectedClub === "all" || shot.club === selectedClub)
      .reduce((acc, shot) => {
        const key = `${shot.club}-${shot.date}`;
        if (!acc[key]) {
          acc[key] = {
            club: shot.club,
            date: shot.date.toISOString(),
            shots: [],
          };
        }
        acc[key].shots.push(shot);
        return acc;
      }, {} as Record<string, { club: string; date: string; shots: Shot[] }>)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Add this after groupedShots calculation
  const chartData = calculateAveragesByDate(shots, selectedClub);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Golf Shot Data</h1>
        <CsvUploadForm
          onShotsUploaded={(newShots) =>
            setShots((prev) => [...prev, ...newShots])
          }
        />
      </div>

      <div className="mb-6">
        <label htmlFor="clubFilter" className="mr-2">
          Filter by Club:
        </label>
        <select
          id="clubFilter"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Clubs</option>
          {uniqueClubs.map((club) => (
            <option key={club} value={club}>
              {club}
            </option>
          ))}
        </select>
      </div>

      <BallSpeedChart chartData={chartData} />

      <div className="mb-24 h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Individual Shots</h2>
        <div className="mb-4">
          <label htmlFor="dateFilter" className="mr-2">
            Filter by Date:
          </label>
          <select
            id="dateFilter"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        <ShotScatterChart
          shots={shots}
          selectedClub={selectedClub}
          selectedDate={selectedDate}
        />
      </div>

      <div className="grid gap-6">
        {groupedShots.map(({ club, date, shots }) => (
          <div key={`${club}-${date}`} className="border rounded-lg p-4">
            <ShotDetailsTable club={club} date={date} shots={shots} />
          </div>
        ))}
      </div>
    </div>
  );
}
