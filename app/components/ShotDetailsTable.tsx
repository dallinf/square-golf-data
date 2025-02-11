import { Shot } from "~/types/shot";
import { calculateMedian } from "~/utils/shotCalculations";

interface Props {
  club: string;
  date: string;
  shots: Shot[];
}

export function ShotDetailsTable({ club, date, shots }: Props) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">
        {club} - {new Date(date).toLocaleDateString()}
      </h2>
      <p className="text-gray-600 mb-4">Number of shots: {shots.length}</p>
      <p className="text-gray-600 mb-4">
        Average ball speed:{" "}
        {(
          shots.reduce((acc, shot) => acc + shot.ballSpeed, 0) / shots.length
        ).toFixed(1)}{" "}
        mph
      </p>
      <p className="text-gray-600 mb-4">
        Median ball speed: {calculateMedian(shots).toFixed(1)} mph
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-500">
              <th className="px-4 py-2">Ball Speed (mph)</th>
              <th className="px-4 py-2">Carry (yd)</th>
              <th className="px-4 py-2">Total (yd)</th>
              <th className="px-4 py-2">Offline (yd)</th>
              <th className="px-4 py-2">Place</th>
            </tr>
          </thead>
          <tbody>
            {shots.map((shot, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-center">{shot.ballSpeed}</td>
                <td className="px-4 py-2 text-center">{shot.carryDistance}</td>
                <td className="px-4 py-2 text-center">{shot.totalDistance}</td>
                <td className="px-4 py-2 text-center">
                  {shot.offlineDistance}
                </td>
                <td className="px-4 py-2 text-center">{shot.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
