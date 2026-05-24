"use client";

import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  RefreshCw,
  Download,
  Cpu,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Mock Data ────────────────────────────────────────────────────────────────

const forecastData = [
  { month: "Jan", actual: 1120, predicted: 1080, upper: 1150, lower: 1010 },
  { month: "Feb", actual: 1250, predicted: 1210, upper: 1290, lower: 1130 },
  { month: "Mar", actual: 1180, predicted: 1230, upper: 1310, lower: 1150 },
  { month: "Apr", actual: 1340, predicted: 1310, upper: 1400, lower: 1220 },
  { month: "May", actual: 1410, predicted: 1380, upper: 1470, lower: 1290 },
  { month: "Jun", actual: 1520, predicted: 1490, upper: 1590, lower: 1390 },
  { month: "Jul", actual: null, predicted: 1560, upper: 1700, lower: 1420 },
  { month: "Aug", actual: null, predicted: 1630, upper: 1810, lower: 1450 },
  { month: "Sep", actual: null, predicted: 1710, upper: 1930, lower: 1490 },
  { month: "Oct", actual: null, predicted: 1780, upper: 2050, lower: 1510 },
  { month: "Nov", actual: null, predicted: 1850, upper: 2170, lower: 1530 },
  { month: "Dec", actual: null, predicted: 1940, upper: 2310, lower: 1570 },
];

const skuPredictions = [
  {
    id: "sku-row-1",
    code: "SKU-A1024",
    name: "Industrial Servo Motor X7",
    current: 2340,
    predicted: 2780,
    trend: "up" as const,
    confidence: 94.2,
  },
  {
    id: "sku-row-2",
    code: "SKU-B2048",
    name: "Hydraulic Pump Assembly",
    current: 1850,
    predicted: 1620,
    trend: "down" as const,
    confidence: 88.7,
  },
  {
    id: "sku-row-3",
    code: "SKU-C3072",
    name: "PLC Controller Unit M3",
    current: 3120,
    predicted: 3150,
    trend: "stable" as const,
    confidence: 96.1,
  },
  {
    id: "sku-row-4",
    code: "SKU-D4096",
    name: "Stainless Steel Bearing Kit",
    current: 4570,
    predicted: 5210,
    trend: "up" as const,
    confidence: 91.5,
  },
  {
    id: "sku-row-5",
    code: "SKU-E5120",
    name: "Thermal Sensor Array TS-9",
    current: 980,
    predicted: 870,
    trend: "down" as const,
    confidence: 85.3,
  },
  {
    id: "sku-row-6",
    code: "SKU-F6144",
    name: "Conveyor Belt Module 220V",
    current: 1640,
    predicted: 1680,
    trend: "stable" as const,
    confidence: 93.8,
  },
];

const modelPerformanceData = [
  { cycle: "Cycle 1", mape: 14.2 },
  { cycle: "Cycle 2", mape: 11.8 },
  { cycle: "Cycle 3", mape: 10.5 },
  { cycle: "Cycle 4", mape: 9.1 },
  { cycle: "Cycle 5", mape: 8.9 },
  { cycle: "Cycle 6", mape: 8.3 },
];

const trainingHistory = [
  {
    id: "train-1",
    date: "2026-05-24 18:30",
    duration: "12m 34s",
    datasetSize: "148,230",
    mape: 8.3,
    status: "completed" as const,
  },
  {
    id: "train-2",
    date: "2026-05-19 06:00",
    duration: "—",
    datasetSize: "148,230",
    mape: null,
    status: "running" as const,
  },
  {
    id: "train-3",
    date: "2026-05-14 06:00",
    duration: "11m 58s",
    datasetSize: "142,810",
    mape: 8.9,
    status: "completed" as const,
  },
  {
    id: "train-4",
    date: "2026-05-09 06:00",
    duration: "13m 12s",
    datasetSize: "137,500",
    mape: 9.1,
    status: "completed" as const,
  },
  {
    id: "train-5",
    date: "2026-05-04 06:00",
    duration: "2m 07s",
    datasetSize: "131,920",
    mape: null,
    status: "failed" as const,
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up")
    return <TrendingUp className="h-4 w-4 text-emerald-500" />;
  if (trend === "down")
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-amber-500" />;
}

function StatusBadge({ status }: { status: "completed" | "running" | "failed" }) {
  if (status === "completed")
    return (
      <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20">
        Completed
      </Badge>
    );
  if (status === "running")
    return (
      <Badge className="bg-blue-500/15 text-blue-600 border-blue-200 hover:bg-blue-500/20">
        Running
      </Badge>
    );
  return (
    <Badge className="bg-red-500/15 text-red-600 border-red-200 hover:bg-red-500/20">
      Failed
    </Badge>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AIForecastingPage() {
  return (
    <div id="ai-forecasting-page" className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <section id="page-header" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            AI Demand Forecasting
          </h1>
          <p className="text-muted-foreground">
            ML-powered SKU demand prediction &amp; trend analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button id="btn-train-model" variant="default">
            <Brain className="mr-2 h-4 w-4" />
            Train Model
          </Button>
          <Button id="btn-export-predictions" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Predictions
          </Button>
        </div>
      </section>

      {/* ── Model Status Card ───────────────────────────────────────────── */}
      <Card id="model-status-card">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Cpu className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <CardTitle className="text-base">Model Status</CardTitle>
              <p className="text-sm text-muted-foreground">
                Prophet v2.1 &nbsp;·&nbsp; Last trained: 2 hours ago &nbsp;·&nbsp; Next scheduled: In 5 days
              </p>
            </div>
          </div>
          <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20 w-fit">
            <Activity className="mr-1 h-3 w-3" />
            Active
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div id="metric-mape" className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-muted/40">
              <span className="text-sm font-medium text-muted-foreground">MAPE</span>
              <span className="mt-1 text-2xl font-bold tracking-tight">8.3%</span>
              <span className="text-xs text-emerald-500">▼ 0.6 pp vs prev</span>
            </div>
            <div id="metric-rmse" className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-muted/40">
              <span className="text-sm font-medium text-muted-foreground">RMSE</span>
              <span className="mt-1 text-2xl font-bold tracking-tight">124</span>
              <span className="text-xs text-emerald-500">▼ 11 vs prev</span>
            </div>
            <div id="metric-r2" className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:bg-muted/40">
              <span className="text-sm font-medium text-muted-foreground">R² Score</span>
              <span className="mt-1 text-2xl font-bold tracking-tight">0.94</span>
              <span className="text-xs text-emerald-500">▲ 0.02 vs prev</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Main Forecast Chart ─────────────────────────────────────────── */}
      <Card id="forecast-chart-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-blue-500" />
            SKU Demand Forecast — 90 Day Horizon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div id="forecast-chart" className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="confidenceBandFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border)",
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                  }}
                />
                <Legend verticalAlign="top" height={36} />

                {/* Confidence band – upper */}
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="none"
                  fill="url(#confidenceBandFill)"
                  name="Upper Bound"
                  fillOpacity={1}
                  connectNulls
                />
                {/* Confidence band – lower (white overlay trick for visual band) */}
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="none"
                  fill="#d1d5db"
                  name="Lower Bound"
                  fillOpacity={0.15}
                  connectNulls
                />

                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#3B82F6" }}
                  activeDot={{ r: 6 }}
                  name="Actual Demand"
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  strokeDasharray="6 3"
                  dot={{ r: 4, fill: "#8B5CF6" }}
                  activeDot={{ r: 6 }}
                  name="Predicted"
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Two-column Section ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ── Left: Top SKU Predictions ─────────────────────────────────── */}
        <Card id="sku-predictions-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Top SKU Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table id="sku-predictions-table" className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">SKU Code</th>
                    <th className="pb-3 pr-4 font-medium">Product Name</th>
                    <th className="pb-3 pr-4 font-medium text-right">Current</th>
                    <th className="pb-3 pr-4 font-medium text-right">Predicted (30d)</th>
                    <th className="pb-3 pr-4 font-medium text-center">Trend</th>
                    <th className="pb-3 font-medium text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {skuPredictions.map((row) => (
                    <tr
                      key={row.id}
                      id={row.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/40"
                    >
                      <td className="py-3 pr-4 font-mono text-xs font-semibold">
                        {row.code}
                      </td>
                      <td className="py-3 pr-4 max-w-[160px] truncate">
                        {row.name}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums">
                        {row.current.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-right font-semibold tabular-nums">
                        {row.predicted.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4 text-center">
                        <span className="inline-flex items-center gap-1">
                          <TrendIcon trend={row.trend} />
                          <span className="sr-only">{row.trend}</span>
                        </span>
                      </td>
                      <td className="py-3 text-right tabular-nums">
                        {row.confidence}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Right: Model Performance ──────────────────────────────────── */}
        <Card id="model-performance-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <RefreshCw className="h-5 w-5 text-blue-500" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div id="performance-chart" className="h-[310px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelPerformanceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="cycle" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 18]}
                    label={{ value: "MAPE %", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "0.5rem",
                      border: "1px solid var(--border)",
                      boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                    }}
                    formatter={(value) => [`${value}%`, "MAPE"]}
                  />
                  <ReferenceLine
                    y={12}
                    stroke="#EF4444"
                    strokeDasharray="6 3"
                    strokeWidth={1.5}
                    label={{
                      value: "Threshold 12%",
                      position: "right",
                      fill: "#EF4444",
                      fontSize: 11,
                    }}
                  />
                  <Bar
                    dataKey="mape"
                    name="MAPE"
                    fill="#8B5CF6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Training History ─────────────────────────────────────────────── */}
      <Card id="training-history-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-500" />
            Training History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table id="training-history-table" className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-6 font-medium">Training Date</th>
                  <th className="pb-3 pr-6 font-medium">Duration</th>
                  <th className="pb-3 pr-6 font-medium text-right">Dataset Size</th>
                  <th className="pb-3 pr-6 font-medium text-right">MAPE</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {trainingHistory.map((row) => (
                  <tr
                    key={row.id}
                    id={row.id}
                    className="border-b last:border-0 transition-colors hover:bg-muted/40"
                  >
                    <td className="py-3 pr-6 tabular-nums">{row.date}</td>
                    <td className="py-3 pr-6 tabular-nums">{row.duration}</td>
                    <td className="py-3 pr-6 text-right tabular-nums">
                      {row.datasetSize}
                    </td>
                    <td className="py-3 pr-6 text-right font-semibold tabular-nums">
                      {row.mape !== null ? `${row.mape}%` : "—"}
                    </td>
                    <td className="py-3 text-center">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
