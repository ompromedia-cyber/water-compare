"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function WaterRadar({ sample }) {
  const data = {
    labels: Object.keys(sample.normalized),
    datasets: [
      {
        label: sample.name,
        data: Object.values(sample.normalized),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2
      }
    ]
  };

  return <Radar data={data} />;
}