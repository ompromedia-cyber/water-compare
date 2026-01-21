'use client';

import React, { useMemo, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

/* =======================
   Типы и данные
======================= */

type WaterMetric = {
  name: string;
  value: number; // 0–100
};

type WaterBrand = {
  id: string;
  title: string;
  metrics: WaterMetric[];
};

const WATERS: WaterBrand[] = [
  {
    id: 'evian',
    title: 'Evian',
    metrics: [
      { name: 'Minerals', value: 78 },
      { name: 'pH Balance', value: 82 },
      { name: 'Purity', value: 88 },
      { name: 'Taste', value: 85 },
      { name: 'Eco Score', value: 70 },
    ],
  },
  {
    id: 'fiji',
    title: 'Fiji',
    metrics: [
      { name: 'Minerals', value: 85 },
      { name: 'pH Balance', value: 80 },
      { name: 'Purity', value: 90 },
      { name: 'Taste', value: 88 },
      { name: 'Eco Score', value: 65 },
    ],
  },
  {
    id: 'voss',
    title: 'Voss',
    metrics: [
      { name: 'Minerals', value: 72 },
      { name: 'pH Balance', value: 75 },
      { name: 'Purity', value: 86 },
      { name: 'Taste', value: 80 },
      { name: 'Eco Score', value: 78 },
    ],
  },
];

/* =======================
   Вспомогательные функции
======================= */

function calculateScore(metrics: WaterMetric[]) {
  const sum = metrics.reduce((acc, m) => acc + m.value, 0);
  return Math.round(sum / metrics.length);
}

/* =======================
   Компонент
======================= */

export default function WaterIntelligencePrototype() {
  const [activeId, setActiveId] = useState(WATERS[0].id);

  const watersWithScore = useMemo(() => {
    return WATERS.map((w) => ({
      ...w,
      score: calculateScore(w.metrics),
    }));
  }, []);

  const bestWater = useMemo(() => {
    return [...watersWithScore].sort((a, b) => b.score - a.score)[0];
  }, [watersWithScore]);

  const activeWater =
    watersWithScore.find((w) => w.id === activeId) ?? bestWater;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Water Intelligence
          </h1>
          <Badge variant="secondary" className="text-sm">
            AI Quality Compare
          </Badge>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeId}
          onValueChange={setActiveId}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3">
            {watersWithScore.map((w) => (
              <TabsTrigger key={w.id} value={w.id}>
                {w.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quality Radar
                {activeWater.id === bestWater.id && (
                  <Badge className="bg-emerald-600 text-white">
                    BEST
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={activeWater.metrics}>
                  <PolarGrid stroke="#404040" />
                  <PolarAngleAxis
                    dataKey="name"
                    tick={{ fill: '#d4d4d4', fontSize: 12 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Score */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle>Total Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div className="text-7xl font-bold text-emerald-400">
                {activeWater.score}
              </div>
              <p className="text-neutral-400 mt-2">
                Composite water quality index
              </p>

              {activeWater.id === bestWater.id && (
                <div className="mt-4 text-sm text-emerald-300">
                  Best overall water by all indicators
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-xs text-neutral-500 text-center pt-4">
          Scores are calculated as an average of normalized quality indicators
        </div>
      </div>
    </div>
  );
}
