"use client";

import { BarChart3, PieChart, TrendingUp, Download, Plus, FileText, Calendar, Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from "recharts";

const departmentRevenue = [
  { name: "Engineering", revenue: 520000 },
  { name: "Sales", revenue: 890000 },
  { name: "Marketing", revenue: 340000 },
  { name: "Operations", revenue: 420000 },
  { name: "Finance", revenue: 280000 },
  { name: "HR", revenue: 150000 },
];

const expenseBreakdown = [
  { name: "Salaries", value: 45, color: "#3b82f6" },
  { name: "Infrastructure", value: 20, color: "#10b981" },
  { name: "Marketing", value: 15, color: "#f59e0b" },
  { name: "R&D", value: 12, color: "#8b5cf6" },
  { name: "Other", value: 8, color: "#ec4899" },
];

const scheduledReports = [
  { name: "Monthly P&L Statement", frequency: "Monthly", lastRun: "2024-12-01", nextRun: "2025-01-01", format: "PDF", status: "Active" },
  { name: "Weekly Sales Report", frequency: "Weekly", lastRun: "2024-12-13", nextRun: "2024-12-20", format: "Excel", status: "Active" },
  { name: "Quarterly Board Report", frequency: "Quarterly", lastRun: "2024-10-01", nextRun: "2025-01-01", format: "PDF", status: "Active" },
  { name: "Daily Inventory Summary", frequency: "Daily", lastRun: "2024-12-15", nextRun: "2024-12-16", format: "CSV", status: "Active" },
  { name: "Annual Compliance Audit", frequency: "Yearly", lastRun: "2024-01-15", nextRun: "2025-01-15", format: "PDF", status: "Paused" },
];

const chartTypes = [
  { name: "Bar Chart", icon: BarChart3, desc: "Compare categories" },
  { name: "Pie Chart", icon: PieChart, desc: "Show proportions" },
  { name: "Line Chart", icon: TrendingUp, desc: "Track trends" },
  { name: "Dashboard", icon: Layout, desc: "Combined view" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
          <p className="text-[var(--muted-foreground)]">Dashboard builder, analytics & scheduled reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" id="bi-export"><Download className="h-4 w-4" /> Export</Button>
          <Button id="bi-new-dashboard"><Plus className="h-4 w-4" /> New Dashboard</Button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {chartTypes.map((ct) => (
          <button key={ct.name} className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all hover:border-[var(--ring)] hover:shadow-md cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] transition-colors group-hover:bg-[var(--accent)]">
              <ct.icon className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div className="text-left"><p className="text-sm font-medium">{ct.name}</p><p className="text-xs text-[var(--muted-foreground)]">{ct.desc}</p></div>
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Revenue by Department</CardTitle><CardDescription>Current fiscal year breakdown</CardDescription></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`]} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Expense Breakdown</CardTitle><CardDescription>Current quarter allocation</CardDescription></CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                    {expenseBreakdown.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Scheduled Reports</CardTitle><CardDescription>Automated report generation & delivery</CardDescription></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Report Name</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Frequency</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Last Run</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Next Run</th>
                <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Format</th>
                <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
              </tr></thead>
              <tbody>{scheduledReports.map((r) => (
                <tr key={r.name} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                  <td className="px-4 py-3 font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-[var(--muted-foreground)]" />{r.name}</td>
                  <td className="px-4 py-3"><Badge variant="outline">{r.frequency}</Badge></td>
                  <td className="px-4 py-3 font-mono text-xs">{r.lastRun}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.nextRun}</td>
                  <td className="px-4 py-3 text-center"><Badge variant="secondary">{r.format}</Badge></td>
                  <td className="px-4 py-3 text-center"><Badge variant={r.status === "Active" ? "success" : "warning"}>{r.status}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
