"use client";

import { Bell, Check, CheckCheck, Clock, DollarSign, Package, Users, Brain, Shield, AlertCircle, Info, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const notifications = [
  { id: 1, title: "Invoice #INV-2024-089 approved", desc: "Sarah Chen approved the invoice for $45,000", time: "2 hours ago", module: "Finance", icon: DollarSign, read: false, type: "success" },
  { id: 2, title: "Low stock alert: Widget-A", desc: "Current stock (8 units) is below reorder threshold (20)", time: "3 hours ago", module: "Supply Chain", icon: Package, read: false, type: "warning" },
  { id: 3, title: "New employee onboarded", desc: "Maya Patel has been added to the Engineering department", time: "5 hours ago", module: "HR", icon: Users, read: false, type: "info" },
  { id: 4, title: "AI model training completed", desc: "Demand forecasting model retrained — MAPE improved to 8.1%", time: "8 hours ago", module: "AI", icon: Brain, read: true, type: "success" },
  { id: 5, title: "Security: Failed login attempts", desc: "3 failed login attempts detected for admin@amdox.com", time: "1 day ago", module: "Security", icon: Shield, read: true, type: "critical" },
  { id: 6, title: "Payroll run completed", desc: "December 2024 payroll processed for 1,247 employees", time: "1 day ago", module: "HR", icon: DollarSign, read: true, type: "success" },
  { id: 7, title: "System maintenance scheduled", desc: "Planned maintenance window: Dec 20, 2024, 02:00-04:00 UTC", time: "2 days ago", module: "System", icon: Settings, read: true, type: "info" },
  { id: 8, title: "PO #PO-4521 requires approval", desc: "Purchase order totaling $45,200 submitted by Alex Thompson", time: "2 days ago", module: "Supply Chain", icon: Package, read: true, type: "warning" },
];

const channelPreferences = [
  { channel: "In-App", events: { finance: true, hr: true, supply: true, ai: true, security: true, system: true } },
  { channel: "Email", events: { finance: true, hr: true, supply: false, ai: false, security: true, system: true } },
  { channel: "SMS", events: { finance: false, hr: false, supply: false, ai: false, security: true, system: false } },
  { channel: "Webhook", events: { finance: true, hr: false, supply: true, ai: true, security: true, system: true } },
];

function NotificationIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    critical: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  };
  const icons: Record<string, typeof Check> = { success: Check, warning: AlertCircle, critical: Shield, info: Info };
  const Icon = icons[type] || Info;
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors[type] || colors.info}`}>
      <Icon className="h-5 w-5" />
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-[var(--muted-foreground)]">Activity alerts, system notifications & channel preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" id="notif-mark-all"><CheckCheck className="h-4 w-4" /> Mark All Read</Button>
          <Button variant="outline" id="notif-settings"><Settings className="h-4 w-4" /> Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Unread", value: "3", color: "text-blue-500" },
          { label: "Today", value: "5", color: "text-emerald-500" },
          { label: "This Week", value: "12", color: "text-amber-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <Bell className={`h-6 w-6 ${stat.color}`} />
              <div><p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="unread">Unread</TabsTrigger><TabsTrigger value="preferences">Preferences</TabsTrigger></TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-4 border-b border-[var(--border)] p-4 transition-colors hover:bg-[var(--muted)]/50 ${!n.read ? "bg-[var(--accent)]/30" : ""}`}>
                  <NotificationIcon type={n.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{n.desc}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock className="h-3 w-3 text-[var(--muted-foreground)]" />
                      <span className="text-xs text-[var(--muted-foreground)]">{n.time}</span>
                      <Badge variant="outline" className="text-[10px]">{n.module}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardContent className="p-0">
              {notifications.filter((n) => !n.read).map((n) => (
                <div key={n.id} className="flex items-start gap-4 border-b border-[var(--border)] p-4 bg-[var(--accent)]/30">
                  <NotificationIcon type={n.type} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{n.desc}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Clock className="h-3 w-3 text-[var(--muted-foreground)]" />
                      <span className="text-xs text-[var(--muted-foreground)]">{n.time}</span>
                      <Badge variant="outline" className="text-[10px]">{n.module}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader><CardTitle className="text-lg">Channel Preferences</CardTitle><CardDescription>Configure notification delivery per channel and module</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Channel</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Finance</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">HR</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Supply Chain</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">AI</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Security</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">System</th>
                  </tr></thead>
                  <tbody>{channelPreferences.map((ch) => (
                    <tr key={ch.channel} className="border-b border-[var(--border)]">
                      <td className="px-4 py-3 font-medium">{ch.channel}</td>
                      {Object.values(ch.events).map((enabled, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          <div className={`mx-auto h-5 w-9 rounded-full ${enabled ? "bg-emerald-500" : "bg-[var(--muted)]"} relative cursor-pointer transition-colors`}>
                            <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
