import { AgGridReact } from "ag-grid-react";
import { Shot } from "~/types/shot";

interface Props {
  shots: Shot[];
}

export const ShotDetailsTableNew = ({ shots }: Props) => {
  const columnDefs = [
    { headerName: "Club", field: "club" },
    { headerName: "Date", field: "date" },
    { headerName: "Ball Speed (mph)", field: "ballSpeed" },
    { headerName: "Carry (yd)", field: "carryDistance" },
    { headerName: "Total (yd)", field: "totalDistance" },
    { headerName: "Offline (yd)", field: "offlineDistance" },
    { headerName: "Place", field: "place" },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={shots} />
    </div>
  );
};
