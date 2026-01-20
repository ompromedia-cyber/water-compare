"use client";
import { useEffect, useState } from "react";
import { waters } from "@/data/waters";
import WaterRadar from "@/components/WaterRadar";

export default function Home() {
  const [compareRes, setCompareRes] = useState(null);

  const handleCompare = async () => {
    const ids = waters.map(w => w.id);
    const res = await fetch("/api/compare", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
    const json = await res.json();
    setCompareRes(json);
  };

  useEffect(() => {
    handleCompare();
  }, []);

  if (!compareRes) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial" }}>
      <h1>Сравнение воды</h1>

      <h2>Лучшая вода: {compareRes.best.name}</h2>
      <p>Score: {compareRes.best.score.toFixed(2)}</p>

      {compareRes.samples.map(w => (
        <div key={w.id} style={{ marginBottom: "2rem" }}>
          <h3>{w.name}</h3>
          <WaterRadar sample={w} />
        </div>
      ))}
    </div>
  );
}