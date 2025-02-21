import {
  themeQuartz,
  type ColDef,
  type FilterChangedEvent,
  type GridApi,
  type RowDataUpdatedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Shot } from "~/types/shot";

interface Props {
  shots: Shot[];
  onFilteredShotsChanged: (shots: Shot[]) => void;
}

export const ShotDetailsTableNew = ({
  shots,
  onFilteredShotsChanged,
}: Props) => {
  const columnDefs: ColDef<Shot>[] = [
    { headerName: "Club", field: "club", filter: true },
    { headerName: "Date", field: "date", filter: true },
    { headerName: "Ball Speed (mph)", field: "ballSpeed", filter: true },
    { headerName: "Launch Dir", field: "launchDir", filter: true },
    { headerName: "Launch Angle", field: "launchAngle", filter: true },
    { headerName: "Back Spin", field: "backSpin", filter: true },
    { headerName: "Side Spin", field: "sideSpin", filter: true },
    { headerName: "Spin Rate", field: "spinRate", filter: true },
    { headerName: "Spin Axis", field: "spinAxis", filter: true },
    { headerName: "Offline (yd)", field: "offlineDistance", filter: true },
    { headerName: "Carry (yd)", field: "carryDistance", filter: true },
    { headerName: "Total (yd)", field: "totalDistance", filter: true },
    { headerName: "Club Path", field: "clubPath", filter: true },
    { headerName: "Face Angle", field: "faceAngle", filter: true },
    { headerName: "Attack Angle", field: "attackAngle", filter: true },
    { headerName: "Dynamic Loft", field: "dynamicLoft", filter: true },
  ];

  const findFilteredShots = (api: GridApi) => {
    const filteredShots: Shot[] = [];
    api.forEachNodeAfterFilterAndSort((node) => {
      filteredShots.push(node.data);
    });
    onFilteredShotsChanged(filteredShots);
  };

  const handleFilterChanged = (evt: FilterChangedEvent) => {
    findFilteredShots(evt.api);
  };

  const handleRowDataUpdated = (evt: RowDataUpdatedEvent) => {
    findFilteredShots(evt.api);
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={shots}
        theme={themeQuartz}
        onRowDataUpdated={handleRowDataUpdated}
        onFilterChanged={handleFilterChanged}
      />
    </div>
  );
};
