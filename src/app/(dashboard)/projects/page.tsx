"use client";

import { FolderKanban, Plus, Users, DollarSign, Calendar, Target, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "ERP Cloud Migration", lead: "Sarah Chen", budget: "$450K", spent: "$312K", progress: 69, status: "On Track", team: 12, deadline: "2025-03-15", priority: "High" },
  { name: "Mobile App v2.0", lead: "Alex Thompson", budget: "$180K", spent: "$95K", progress: 53, status: "On Track", team: 6, deadline: "2025-02-28", priority: "High" },
  { name: "Data Lake Implementation", lead: "Lisa Wang", budget: "$320K", spent: "$298K", progress: 88, status: "At Risk", team: 8, deadline: "2025-01-31", priority: "Critical" },
  { name: "HR Portal Redesign", lead: "Emily Rodriguez", budget: "$120K", spent: "$45K", progress: 35, status: "On Track", team: 4, deadline: "2025-04-30", priority: "Medium" },
  { name: "Security Audit & Compliance", lead: "Michael Brown", budget: "$90K", spent: "$87K", progress: 95, status: "Completed", team: 3, deadline: "2024-12-31", priority: "Critical" },
  { name: "Vendor Portal Integration", lead: "James Wilson", budget: "$200K", spent: "$156K", progress: 72, status: "Delayed", team: 5, deadline: "2025-01-15", priority: "High" },
];

const milestones = [
  { name: "Phase 1 - Requirements", project: "ERP Cloud Migration", date: "2024-10-15", status: "Completed" },
  { name: "Beta Release", project: "Mobile App v2.0", date: "2025-01-15", status: "In Progress" },
  { name: "Data Pipeline Live", project: "Data Lake Implementation", date: "2025-01-20", status: "At Risk" },
  { name: "UAT Sign-off", project: "HR Portal Redesign", date: "2025-03-01", status: "Upcoming" },
  { name: "SOC 2 Certification", project: "Security Audit", date: "2024-12-20", status: "Completed" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "destructive" | "secondary" | "default"> = {
    "On Track": "success", "At Risk": "warning", Delayed: "destructive",
    Completed: "success", "In Progress": "default", Upcoming: "secondary",
  };
  return <Badge variant={map[status] || "outline"}>{status}</Badge>;
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, "destructive" | "warning" | "secondary"> = {
    Critical: "destructive", High: "warning", Medium: "secondary",
  };
  return <Badge variant={map[priority] || "secondary"} className="text-[10px]">{priority}</Badge>;
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-[var(--muted-foreground)]">Track projects, milestones, budgets & resources</p>
        </div>
        <Button id="projects-new-btn"><Plus className="h-4 w-4" /> New Project</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active Projects", value: "6", icon: FolderKanban, color: "from-blue-500 to-indigo-600" },
          { title: "Team Members", value: "38", icon: Users, color: "from-emerald-500 to-teal-600" },
          { title: "Total Budget", value: "$1.36M", icon: DollarSign, color: "from-amber-500 to-orange-600" },
          { title: "Upcoming Milestones", value: "5", icon: Target, color: "from-violet-500 to-purple-600" },
        ].map((card) => (
          <Card key={card.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-[var(--muted-foreground)]">{card.title}</p><p className="text-2xl font-bold mt-1">{card.value}</p></div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}><card.icon className="h-5 w-5 text-white" /></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <Card key={proj.name} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-2">
                  <h3 className="font-semibold truncate">{proj.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">Lead: {proj.lead}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <PriorityBadge priority={proj.priority} />
                  <StatusBadge status={proj.status} />
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">Progress</span>
                  <span className="font-bold">{proj.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                  <div className={`h-full rounded-full transition-all ${proj.progress >= 90 ? "bg-emerald-500" : proj.progress >= 60 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-[var(--muted)]/50 p-2 text-center">
                  <DollarSign className="h-3 w-3 mx-auto text-[var(--muted-foreground)] mb-0.5" />
                  <p className="font-medium">{proj.spent}</p>
                  <p className="text-[var(--muted-foreground)]">of {proj.budget}</p>
                </div>
                <div className="rounded-lg bg-[var(--muted)]/50 p-2 text-center">
                  <Users className="h-3 w-3 mx-auto text-[var(--muted-foreground)] mb-0.5" />
                  <p className="font-medium">{proj.team}</p>
                  <p className="text-[var(--muted-foreground)]">members</p>
                </div>
                <div className="rounded-lg bg-[var(--muted)]/50 p-2 text-center">
                  <Calendar className="h-3 w-3 mx-auto text-[var(--muted-foreground)] mb-0.5" />
                  <p className="font-medium text-[10px]">{proj.deadline}</p>
                  <p className="text-[var(--muted-foreground)]">deadline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Milestones */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Upcoming Milestones</CardTitle><CardDescription>Key milestones across all projects</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-[var(--muted)]/50">
                <div className={`h-3 w-3 rounded-full ${m.status === "Completed" ? "bg-emerald-500" : m.status === "In Progress" ? "bg-blue-500" : m.status === "At Risk" ? "bg-amber-500" : "bg-slate-400"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{m.project}</p>
                </div>
                <span className="text-xs font-mono text-[var(--muted-foreground)]">{m.date}</span>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
