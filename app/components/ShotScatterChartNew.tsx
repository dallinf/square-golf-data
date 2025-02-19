import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

import { Shot } from "~/types/shot";

interface ShotScatterChartProps {
  shots: Shot[];
}

export function ShotScatterChartNew({ shots }: ShotScatterChartProps) {
  const options: AgChartOptions = {
    title: {
      text: "Individual Shots",
    },
    subtitle: {
      text: "by offline distance",
    },
    series: [
      {
        type: "scatter",
        title: "Offline Distance",
        data: shots,
        xKey: "offlineDistance",
        xName: "Offline Distance",
        yKey: "totalDistance",
        yName: "Total Distance",
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: {
          text: "Offline Distance",
        },
        label: {
          formatter: (params) => {
            return params.value + "yd";
          },
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Total Distance",
        },
        label: {
          formatter: (params) => {
            return params.value + "yd";
          },
        },
      },
    ],
  };

  return (
    <AgCharts options={options} style={{ width: "100%", height: "100%" }} />
  );
}
