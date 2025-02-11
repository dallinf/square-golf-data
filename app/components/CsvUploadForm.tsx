import { useState } from "react";
import Papa from "papaparse";
import { Shot } from "~/types/shot";

interface Props {
  onShotsUploaded: (newShots: Shot[]) => void;
}

export function CsvUploadForm({ onShotsUploaded }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    const fileInput = event.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      setIsUploading(true);
      try {
        const newShots: Shot[] = [];

        for (const file of files) {
          const content = await file.text();
          const lines = content.split("\n");
          const firstLineContent = lines[0].split(",");

          const dateString = firstLineContent[1];
          const year = parseInt(dateString.slice(0, 4));
          const month = parseInt(dateString.slice(4, 6)) - 1;
          const day = parseInt(dateString.slice(6, 8));
          const date = new Date(year, month, day);
          const place = firstLineContent[3];

          const relevantContent = lines
            .filter(
              (line) => line.length > 0 && !line.trim().startsWith("Dates")
            )
            .join("\n");

          const parseResult = Papa.parse(relevantContent, {
            header: true,
            skipEmptyLines: true,
          });
          const records = parseResult.data;

          const fileShots: Shot[] = records
            .filter(
              (record: any) => record["Club"] && record["Club"].length > 0
            )
            .map((record: any) => {
              const offlineDistanceStr = record["Offline(yd)"];
              const offlineDistance = offlineDistanceStr.endsWith("L")
                ? parseFloat(offlineDistanceStr.slice(0, -1)) * -1
                : parseFloat(offlineDistanceStr);

              return {
                club: record["Club"],
                index: parseInt(record["Index"]),
                ballSpeed: parseFloat(record["Ball Speed(mph)"]),
                totalDistance: parseFloat(record["Total(yd)"]),
                carryDistance: parseFloat(record["Carry(yd)"]),
                offlineDistance: Number((offlineDistance / 3.2).toFixed(1)), // Square has a bug that makes the offline distance 3.2x the actual distance
                filename: file.name,
                place: place,
                date: date,
                timeSinceEpoch: date.valueOf(),
              };
            });

          newShots.push(...fileShots);
        }

        onShotsUploaded(newShots);
      } catch (error) {
        console.error("Error processing CSV files:", error);
      } finally {
        setIsUploading(false);
        fileInput.value = ""; // Reset file input
      }
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onChange={handleFileChange}
      className="inline-block"
    >
      <input
        type="file"
        name="csvFile"
        accept=".csv"
        className="hidden"
        id="csvFileInput"
        disabled={isUploading}
        multiple
      />
      <label
        htmlFor="csvFileInput"
        className={`${
          isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        } text-white px-4 py-2 rounded inline-flex items-center`}
      >
        {isUploading ? "Processing..." : "Upload CSV Files"}
      </label>
    </form>
  );
}
