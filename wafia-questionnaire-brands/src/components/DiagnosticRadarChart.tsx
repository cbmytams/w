/**
 * WAFIA DIAGNOSTIC TOOL - RADAR CHART
 * Direction: Heat Map Radar
 */

import { useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { Scores } from "../types";
import { scoresToRadarData } from "../utils/scoring";
import { PILLARS, PILLAR_ORDER } from "../constants";

interface DiagnosticRadarChartProps {
  scores: Scores;
}

interface CustomTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const CustomTick = ({ x, y, payload }: CustomTickProps) => {
  const pillarKey = PILLAR_ORDER.find(
    (key) => PILLARS[key].label === payload.value
  );
  const color = pillarKey ? PILLARS[pillarKey].color : "#999";

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="middle"
        fill={color}
        fontSize={11}
        fontWeight={700}
        letterSpacing="0.05em"
        style={{ textTransform: "uppercase" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

export function DiagnosticRadarChart({ scores }: DiagnosticRadarChartProps) {
  const data = useMemo(() => scoresToRadarData(scores), [scores]);

  return (
    <div className="w-full aspect-square max-w-lg mx-auto relative group">
      {/* Background Glow */}
      <div className="absolute inset-20 bg-[var(--heat-end)]/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-[var(--heat-start)]/30 transition-colors duration-700" />

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="pillar"
            tick={<CustomTick x={0} y={0} payload={{ value: "" }} />}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="url(#heatGradient)"
            fill="url(#heatGradientFill)"
            strokeWidth={3}
            dot={{ fill: "#fff", strokeWidth: 0, r: 3 }}
            activeDot={{
              fill: "#fff",
              strokeWidth: 4,
              stroke: "var(--heat-start)",
              r: 6,
            }}
          />
          <Tooltip
            contentStyle={{
              background: "#000",
              border: "1px solid #333",
              borderRadius: "12px",
            }}
            itemStyle={{ color: "#fff" }}
            formatter={(value?: number) => [`${value}/100`, "Score"]}
            labelStyle={{ display: "none" }}
          />
          <defs>
            <linearGradient
              id="heatGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient
              id="heatGradientFill"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
