'use client';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement } from 'chart.js';
ChartJS.register(RadialLinearScale, PointElement, LineElement);

export default function WaterRadar({ sample }: any) {
  const numeric = Object.keys(sample).filter(k => typeof sample[k] === 'number');
  return (
    <Radar data={{
      labels: numeric,
      datasets: [{ data: numeric.map(k => sample[k]) }]
    }} />
  );
}
