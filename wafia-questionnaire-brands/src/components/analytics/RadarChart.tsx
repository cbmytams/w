import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface PillarRadarProps {
  data?: { subject: string; A: number; fullMark: number }[];
}

const FALLBACK_DATA = [
  { subject: "VISION", A: 50, fullMark: 100 },
  { subject: "BUSINESS", A: 50, fullMark: 100 },
  { subject: "REACH", A: 50, fullMark: 100 },
  { subject: "HEALTH", A: 50, fullMark: 100 },
  { subject: "PRODUCTION", A: 50, fullMark: 100 },
];

export function PillarRadar({ data }: PillarRadarProps) {
  const chartData = data && data.length > 0 ? data : FALLBACK_DATA;
  return (
    <div className="h-full w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#ffffff10" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#a1a1aa", fontSize: 10, fontWeight: "bold" }}
          />
          <Radar
            name="Market Profile"
            dataKey="A"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
