"use client";

import {
  Users,
  UserPlus,
  Clock,
  DollarSign,
  Search,
  Calendar,
  Building2,
  CheckCircle2,
  XCircle,
  Clock3,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const employees = [
  { name: "Sarah Chen", email: "sarah.chen@amdox.com", initials: "SC", dept: "Engineering", role: "Senior Developer", status: "Active", joined: "2022-03-15", color: "from-blue-500 to-indigo-500" },
  { name: "James Wilson", email: "james.w@amdox.com", initials: "JW", dept: "Finance", role: "Financial Analyst", status: "Active", joined: "2021-08-20", color: "from-emerald-500 to-teal-500" },
  { name: "Maya Patel", email: "maya.p@amdox.com", initials: "MP", dept: "Engineering", role: "Junior Developer", status: "Probation", joined: "2024-11-01", color: "from-violet-500 to-purple-500" },
  { name: "David Kim", email: "david.k@amdox.com", initials: "DK", dept: "Marketing", role: "Marketing Manager", status: "On Leave", joined: "2020-01-10", color: "from-amber-500 to-orange-500" },
  { name: "Emily Rodriguez", email: "emily.r@amdox.com", initials: "ER", dept: "HR", role: "HR Specialist", status: "Active", joined: "2023-05-22", color: "from-pink-500 to-rose-500" },
  { name: "Alex Thompson", email: "alex.t@amdox.com", initials: "AT", dept: "Operations", role: "Operations Lead", status: "Active", joined: "2021-02-14", color: "from-cyan-500 to-blue-500" },
  { name: "Lisa Wang", email: "lisa.w@amdox.com", initials: "LW", dept: "Engineering", role: "Tech Lead", status: "Active", joined: "2019-09-08", color: "from-fuchsia-500 to-pink-500" },
  { name: "Michael Brown", email: "michael.b@amdox.com", initials: "MB", dept: "Finance", role: "Controller", status: "Active", joined: "2020-06-30", color: "from-teal-500 to-emerald-500" },
];

const payrollHistory = [
  { period: "Dec 2024", gross: "$1,285,000", deductions: "$321,250", net: "$963,750", status: "Completed" },
  { period: "Nov 2024", gross: "$1,280,000", deductions: "$320,000", net: "$960,000", status: "Completed" },
  { period: "Oct 2024", gross: "$1,275,000", deductions: "$318,750", net: "$956,250", status: "Completed" },
  { period: "Sep 2024", gross: "$1,268,000", deductions: "$317,000", net: "$951,000", status: "Completed" },
  { period: "Aug 2024", gross: "$1,260,000", deductions: "$315,000", net: "$945,000", status: "Completed" },
  { period: "Jul 2024", gross: "$1,252,000", deductions: "$313,000", net: "$939,000", status: "Completed" },
];

const leaveRequests = [
  { employee: "David Kim", type: "Annual", from: "2024-12-20", to: "2024-12-27", days: 5, status: "Approved" },
  { employee: "Sarah Chen", type: "Sick", from: "2024-12-16", to: "2024-12-17", days: 2, status: "Approved" },
  { employee: "Alex Thompson", type: "Personal", from: "2024-12-23", to: "2024-12-23", days: 1, status: "Pending" },
  { employee: "Lisa Wang", type: "Annual", from: "2024-12-25", to: "2024-12-31", days: 5, status: "Pending" },
  { employee: "Maya Patel", type: "Sick", from: "2024-12-18", to: "2024-12-18", days: 1, status: "Approved" },
  { employee: "Emily Rodriguez", type: "Annual", from: "2025-01-02", to: "2025-01-06", days: 3, status: "Pending" },
];

const attendanceData = [
  { employee: "Sarah Chen", checkIn: "08:55", checkOut: "17:32", hours: "8h 37m", status: "On Time" },
  { employee: "James Wilson", checkIn: "09:05", checkOut: "17:45", hours: "8h 40m", status: "On Time" },
  { employee: "Maya Patel", checkIn: "09:22", checkOut: "18:10", hours: "8h 48m", status: "Late" },
  { employee: "Alex Thompson", checkIn: "08:30", checkOut: "17:00", hours: "8h 30m", status: "On Time" },
  { employee: "Lisa Wang", checkIn: "09:15", checkOut: "18:30", hours: "9h 15m", status: "Late" },
  { employee: "Michael Brown", checkIn: "08:45", checkOut: "17:15", hours: "8h 30m", status: "On Time" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "destructive" | "secondary" | "default"> = {
    Active: "success", "On Leave": "warning", Probation: "default",
    Completed: "success", Pending: "warning", Rejected: "destructive",
    Approved: "success", "On Time": "success", Late: "warning",
  };
  return <Badge variant={map[status] || "secondary"}>{status}</Badge>;
}

export default function HRPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR & Payroll</h1>
          <p className="text-[var(--muted-foreground)]">Employee management, payroll processing & attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" id="hr-run-payroll-btn"><Play className="h-4 w-4" /> Run Payroll</Button>
          <Button id="hr-add-employee-btn"><UserPlus className="h-4 w-4" /> Add Employee</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Total Employees", value: "1,247", icon: Users, color: "from-blue-500 to-indigo-600" },
          { title: "Departments", value: "12", icon: Building2, color: "from-emerald-500 to-teal-600" },
          { title: "Pending Leave", value: "8", icon: Calendar, color: "from-amber-500 to-orange-600" },
          { title: "Payroll This Month", value: "$1.2M", icon: DollarSign, color: "from-violet-500 to-purple-600" },
        ].map((card) => (
          <Card key={card.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-[var(--muted-foreground)]">{card.title}</p><p className="text-2xl font-bold mt-1">{card.value}</p></div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList id="hr-tabs">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div><CardTitle className="text-lg">Employee Directory</CardTitle><CardDescription>All active employees across departments</CardDescription></div>
                <div className="relative w-full sm:w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" /><Input placeholder="Search employees..." className="pl-9" id="hr-search" /></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Employee</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Department</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Role</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Join Date</th>
                  </tr></thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.email} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8"><AvatarFallback className={`bg-gradient-to-br ${emp.color} text-[10px] font-bold text-white`}>{emp.initials}</AvatarFallback></Avatar>
                            <div><p className="font-medium">{emp.name}</p><p className="text-xs text-[var(--muted-foreground)]">{emp.email}</p></div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{emp.dept}</td>
                        <td className="px-4 py-3 text-[var(--muted-foreground)]">{emp.role}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={emp.status} /></td>
                        <td className="px-4 py-3 font-mono text-xs">{emp.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg"><CheckCircle2 className="h-6 w-6 text-white" /></div>
                <div><p className="text-sm text-[var(--muted-foreground)]">Last Payroll Run</p><p className="text-lg font-bold">December 15, 2024</p></div>
                <div className="ml-auto flex gap-8">
                  <div><p className="text-xs text-[var(--muted-foreground)]">Total Amount</p><p className="font-bold">$963,750</p></div>
                  <div><p className="text-xs text-[var(--muted-foreground)]">Employees</p><p className="font-bold">1,247</p></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Payroll History</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Period</th>
                    <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Gross</th>
                    <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Deductions</th>
                    <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Net</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>
                    {payrollHistory.map((row) => (
                      <tr key={row.period} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium">{row.period}</td>
                        <td className="px-4 py-3 text-right font-mono">{row.gross}</td>
                        <td className="px-4 py-3 text-right font-mono text-[var(--muted-foreground)]">{row.deductions}</td>
                        <td className="px-4 py-3 text-right font-mono font-medium">{row.net}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={row.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
            {[
              { type: "Annual Leave", remaining: 18, total: 25, color: "bg-blue-500" },
              { type: "Sick Leave", remaining: 8, total: 12, color: "bg-amber-500" },
              { type: "Personal Leave", remaining: 3, total: 5, color: "bg-violet-500" },
            ].map((lv) => (
              <Card key={lv.type}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">{lv.type}</p>
                  <p className="text-xl font-bold">{lv.remaining}<span className="text-sm font-normal text-[var(--muted-foreground)]">/{lv.total} remaining</span></p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                    <div className={`h-full rounded-full ${lv.color}`} style={{ width: `${(lv.remaining / lv.total) * 100}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle className="text-lg">Leave Requests</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Employee</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">From</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">To</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Days</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>
                    {leaveRequests.map((req, i) => (
                      <tr key={i} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium">{req.employee}</td>
                        <td className="px-4 py-3"><Badge variant="outline">{req.type}</Badge></td>
                        <td className="px-4 py-3 font-mono text-xs">{req.from}</td>
                        <td className="px-4 py-3 font-mono text-xs">{req.to}</td>
                        <td className="px-4 py-3 text-center font-medium">{req.days}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={req.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
            {[
              { label: "Present", value: "1,180", icon: CheckCircle2, color: "text-emerald-500" },
              { label: "Absent", value: "42", icon: XCircle, color: "text-red-500" },
              { label: "Late", value: "25", icon: Clock3, color: "text-amber-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div><p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle className="text-lg">Today&apos;s Attendance</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Employee</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Check In</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Check Out</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Hours</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>
                    {attendanceData.map((row, i) => (
                      <tr key={i} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium">{row.employee}</td>
                        <td className="px-4 py-3 text-center font-mono">{row.checkIn}</td>
                        <td className="px-4 py-3 text-center font-mono">{row.checkOut}</td>
                        <td className="px-4 py-3 text-center font-mono">{row.hours}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={row.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
