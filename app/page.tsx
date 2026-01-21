'use client';
import { useEffect, useState } from 'react';
import { waters } from '../data/waters';
import WaterRadar from '../components/WaterRadar';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/compare', {
      method: 'POST',
      body: JSON.stringify({ ids: waters.map(w => w.id) })
    })
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Лучшая вода: {data.best.name}</h1>
      {data.samples.map((w:any) => (
        <div key={w.id}>
          <h3>{w.name}</h3>
          <WaterRadar sample={w} />
        </div>
      ))}
    </div>
  );
}
