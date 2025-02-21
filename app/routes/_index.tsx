import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { BallSpeedChart } from "~/components/BallSpeedChart";
import { ShotScatterChartNew } from "~/components/ShotScatterChartNew";
import { CsvUploadForm } from "~/components/CsvUploadForm";
import { ShotDetailsTableNew } from "~/components/ShotDetailsTableNew";
import { Shot } from "~/types/shot";

export const meta: MetaFunction = () => {
  return [
    { title: "Square Golf Shot Data" },
    { name: "description", content: "Welcome to Square Golf Shot Data" },
  ];
};

export default function Index() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [visibleShots, setVisibleShots] = useState<Shot[]>([]);

  return (
    <div className="p-8 gap-8 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Golf Shot Data</h1>
        <CsvUploadForm
          onShotsUploaded={(newShots) =>
            setShots((prev) => [...prev, ...newShots])
          }
        />
      </div>

      <ShotDetailsTableNew
        shots={shots}
        onFilteredShotsChanged={(filteredShots) => {
          setVisibleShots(filteredShots);
        }}
      />

      {/* <BallSpeedChart chartData={chartData} /> */}

      <div className="mb-24 h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Individual Shots</h2>

        <ShotScatterChartNew shots={visibleShots} />
      </div>
    </div>
  );
}
