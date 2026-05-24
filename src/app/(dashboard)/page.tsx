"use client";

import {
  DollarSign,
  Users,
  Package,
  CreditCard,
  TrendingUp,
  TrendingDown,
  FileText,
  UserPlus,
  ShoppingCart,
  BarChart3,
  Brain,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 186000, expenses: 152000 },
  { month: "Feb", revenue: 195000, expenses: 158000 },
  { month: "Mar", revenue: 210000, expenses: 162000 },
  { month: "Apr", revenue: 198000, expenses: 155000 },
  { month: "May", revenue: 225000, expenses: 168000 },
  { month: "Jun", revenue: 238000, expenses: 172000 },
  { month: "Jul", revenue: 242000, expenses: 178000 },
  { month: "Aug", revenue: 255000, expenses: 182000 },
  { month: "Sep", revenue: 248000, expenses: 176000 },
  { month: "Oct", revenue: 262000, expenses: 188000 },
  { month: "Nov", revenue: 270000, expenses: 192000 },
  { month: "Dec", revenue: 285000, expenses: 198000 },
];

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Total Expenses",
    value: "$1.8M",
    change: "+3.2%",
    trend: "up" as const,
    icon: CreditCard,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Active Employees",
    value: "1,247",
    change: "+28",
    trend: "up" as const,
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Open Purchase Orders",
    value: "89",
    change: "-15%",
    trend: "down" as const,
    icon: Package,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
  },
];

const recentActivities = [
  {
    text: "Invoice #INV-2024-089 approved by Sarah Chen",
    time: "2 hours ago",
    module: "Finance",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  {
    text: "New employee Maya Patel onboarded to Engineering",
    time: "3 hours ago",
    module: "HR",
    icon: UserPlus,
    iconColor: "text-blue-500",
  },
  {
    text: "Purchase Order #PO-4521 submitted for approval",
    time: "5 hours ago",
    module: "Supply Chain",
    icon: ShoppingCart,
    iconColor: "text-violet-500",
  },
  {
    text: "Payroll run completed for December 2024",
    time: "6 hours ago",
    module: "HR",
    icon: DollarSign,
    iconColor: "text-emerald-500",
  },
  {
    text: "Low stock alert: Widget-A below reorder threshold",
    time: "8 hours ago",
    module: "Supply Chain",
    icon: AlertCircle,
    iconColor: "text-amber-500",
  },
  {
    text: "AI model retrained — MAPE improved to 8.1%",
    time: "1 day ago",
    module: "AI",
    icon: Brain,
    iconColor: "text-purple-500",
  },
];

const quickActions = [
  { label: "Create Invoice", icon: FileText, color: "text-emerald-600" },
  { label: "Run Payroll", icon: DollarSign, color: "text-blue-600" },
  { label: "New Purchase Order", icon: ShoppingCart, color: "text-violet-600" },
  { label: "View Reports", icon: BarChart3, color: "text-amber-600" },
  { label: "Add Employee", icon: UserPlus, color: "text-teal-600" },
  { label: "AI Forecast", icon: Brain, color: "text-purple-600" },
];

const moduleStatus = [
  {
    name: "Finance Module",
    stats: [
      { label: "Pending Approvals", value: "23" },
      { label: "Uptime", value: "98.9%" },
    ],
    progress: 89,
    color: "bg-emerald-500",
  },
  {
    name: "HR Module",
    stats: [
      { label: "Leave Requests", value: "5" },
      { label: "Onboarding Tasks", value: "12" },
    ],
    progress: 72,
    color: "bg-blue-500",
  },
  {
    name: "Supply Chain",
    stats: [
      { label: "Open POs", value: "89" },
      { label: "Low Stock Alerts", value: "3" },
    ],
    progress: 65,
    color: "bg-violet-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-[var(--muted-foreground)]">
          Welcome back! Here&apos;s your business overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className="card-hover" id={`kpi-${kpi.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    <span className="text-xs font-medium text-emerald-600">
                      {kpi.change}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      vs last month
                    </span>
                  </div>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${kpi.color} shadow-lg`}
                >
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card id="revenue-chart-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
              <CardDescription>Financial performance over the last 12 months</CardDescription>
            </div>
            <Badge variant="secondary">Last 12 Months</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}k`, undefined]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Activity + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-3" id="recent-activity-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest actions across all modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--muted)]/50">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] ${activity.iconColor}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.text}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="h-3 w-3 text-[var(--muted-foreground)]" />
                      <span className="text-xs text-[var(--muted-foreground)]">{activity.time}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {activity.module}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2" id="quick-actions-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks across modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  id={`quick-action-${action.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition-all duration-200 hover:border-[var(--ring)] hover:shadow-md cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--muted)] transition-colors group-hover:bg-[var(--accent)]">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Status Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {moduleStatus.map((mod) => (
          <Card key={mod.name} className="card-hover" id={`module-status-${mod.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{mod.name}</h3>
                <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <div className="space-y-3">
                {mod.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">{stat.label}</span>
                    <span className="font-medium">{stat.value}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-1">
                    <span>Health Score</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                    <div
                      className={`h-full rounded-full ${mod.color} transition-all duration-500`}
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
