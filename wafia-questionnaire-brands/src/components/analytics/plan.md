# Analytics Dashboard Implementation Plan

## Goal
Implement the high-fidelity "Command Center" dashboard using Recharts, replacing the simple metrics grid.

## Components to Build

### 1. `src/components/analytics/AnalyticsDashboard.tsx`
- **Layout**: Bento-grid style layout.
- **Header**: Date range picker (visual only), "Live" indicator.
- **Composition**:
  - Top Row: Key Metrics (Total Leads, Velocity, Conversion).
  - Middle Left: `TrendWave` (Lead Velocity).
  - Middle Right: `ConversionFunnel` (Drop-off visualization).
  - Bottom: `PillarRadar` (Market Intelligence).

### 2. `src/components/analytics/AppCharts.tsx`
- **TrendWave**: AreaChart with gradient fill (Neon Green/Blue).
- **MetricCard**: Reusable card with sparkline support.

### 3. `src/components/analytics/FunnelChart.tsx`
- Custom BarChart layout to simulate a funnel.
- Data: Visitors -> Started -> Completed -> Qualified.

### 4. `src/components/analytics/RadarChart.tsx`
- RadarChart showing average scores across the 5 Pillars (Vision, Business, etc.).

## Integration
- Update `src/components/AdminDashboard.tsx` to import and use `AnalyticsDashboard`.

## Styling
- **Theme**: Dark Mode base (`#050505`).
- **Accent**: Neon Green (`#10b981`) and Electric Blue (`#3b82f6`).
- **Motion**: Subtle entry animations.
