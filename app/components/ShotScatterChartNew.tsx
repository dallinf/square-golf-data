import { AgCharts } from "ag-charts-react";
import { AgChartOptions, AgTooltipRendererDataRow } from "ag-charts-community";

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
        yName: "Total asdf Distance",
        tooltip: {
          renderer: (params) => {
            const shot = params.datum as Shot;

            return {
              title: `Shot Details: ${shot.date.toLocaleDateString()}`,
              data: [
                {
                  label: "Club",
                  value: shot.club,
                },
                {
                  label: "Total Distance",
                  value: shot.totalDistance.toString(),
                },
                {
                  label: "Carry Distance",
                  value: shot.carryDistance.toString(),
                },
                {
                  label: "Offline Distance",
                  value: shot.offlineDistance.toString(),
                },
                {
                  label: "Ball Speed",
                  value: shot.ballSpeed.toString(),
                },
                {
                  label: "Launch Angle",
                  value: shot.launchAngle.toString(),
                },
                {
                  label: "Launch Direction",
                  value: shot.launchDir.toString(),
                },
                {
                  label: "Spin Rate",
                  value: shot.spinRate?.toString() ?? "N/A",
                },
                {
                  label: "Spin Axis",
                  value: shot.spinAxis?.toString() ?? "N/A",
                },
                {
                  label: "Back Spin",
                  value: shot.backSpin?.toString() ?? "N/A",
                },
                {
                  label: "Side Spin",
                  value: shot.sideSpin?.toString() ?? "N/A",
                },
                {
                  label: "Club Path",
                  value: shot.clubPath?.toString() ?? "N/A",
                },
                {
                  label: "Face Angle",
                  value: shot.faceAngle?.toString() ?? "N/A",
                },
                {
                  label: "Attack Angle",
                  value: shot.attackAngle?.toString() ?? "N/A",
                },
                {
                  label: "Dynamic Loft",
                  value: shot.dynamicLoft?.toString() ?? "N/A",
                },
              ],
            };
          },
        },
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
        nice: false,
        min: -50,
        max: 50,
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
        nice: false,
        min: 0,
        max: 300,
      },
    ],
  };

  return (
    <AgCharts options={options} style={{ width: "100%", height: "100%" }} />
  );
}
