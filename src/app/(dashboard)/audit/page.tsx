"use client";

import { Shield, Search, FileText, Clock, AlertTriangle, CheckCircle2, Eye, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const auditLogs = [
  { timestamp: "2024-12-15 14:32:05", user: "Sarah Chen", action: "UPDATE", module: "Finance", resource: "Invoice #INV-2024-089", details: "Status changed: Pending → Approved", severity: "Info" },
  { timestamp: "2024-12-15 13:15:22", user: "System", action: "DELETE", module: "HR", resource: "Employee Record #E-1089", details: "GDPR data subject request - soft delete", severity: "Warning" },
  { timestamp: "2024-12-15 12:45:10", user: "Admin", action: "CREATE", module: "Settings", resource: "API Key #ak-92f4", details: "New API key generated for integration", severity: "Info" },
  { timestamp: "2024-12-15 11:30:00", user: "James Wilson", action: "LOGIN", module: "Auth", resource: "Session #s-45821", details: "MFA verified, IP: 192.168.1.45", severity: "Info" },
  { timestamp: "2024-12-15 10:22:18", user: "Unknown", action: "LOGIN_FAILED", module: "Auth", resource: "User: admin@amdox.com", details: "3 failed attempts, account locked", severity: "Critical" },
  { timestamp: "2024-12-15 09:15:33", user: "Lisa Wang", action: "EXPORT", module: "Analytics", resource: "Report #R-2024-Q4", details: "Quarterly board report exported as PDF", severity: "Info" },
  { timestamp: "2024-12-14 18:00:00", user: "System", action: "BACKUP", module: "System", resource: "Database Snapshot", details: "Automated daily backup completed successfully", severity: "Info" },
  { timestamp: "2024-12-14 16:45:12", user: "Maya Patel", action: "UPDATE", module: "Supply Chain", resource: "PO #PO-4521", details: "Purchase order total modified: $42K → $45.2K", severity: "Warning" },
];

const complianceItems = [
  { name: "SOC 2 Type II", status: "Compliant", lastAudit: "2024-09-15", nextAudit: "2025-03-15", score: 94 },
  { name: "GDPR Data Protection", status: "Compliant", lastAudit: "2024-10-01", nextAudit: "2025-04-01", score: 91 },
  { name: "ISO 27001", status: "In Progress", lastAudit: "2024-06-15", nextAudit: "2025-01-15", score: 78 },
  { name: "OWASP Top 10", status: "Compliant", lastAudit: "2024-11-20", nextAudit: "2025-02-20", score: 96 },
];

const gdprRequests = [
  { id: "DSR-001", type: "Data Export", subject: "john.doe@example.com", received: "2024-12-10", deadline: "2025-01-09", status: "In Progress" },
  { id: "DSR-002", type: "Right to Erasure", subject: "jane.smith@example.com", received: "2024-12-08", deadline: "2025-01-07", status: "Completed" },
  { id: "DSR-003", type: "Data Rectification", subject: "bob.jones@example.com", received: "2024-12-14", deadline: "2025-01-13", status: "Pending" },
];

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
    Info: "secondary", Warning: "warning", Critical: "destructive",
  };
  return <Badge variant={map[severity] || "secondary"} className="text-[10px]">{severity}</Badge>;
}

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit & Compliance</h1>
          <p className="text-[var(--muted-foreground)]">Immutable audit trail, compliance status & GDPR management</p>
        </div>
        <Button variant="outline" id="audit-export"><Download className="h-4 w-4" /> Export Logs</Button>
      </div>

      {/* Compliance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {complianceItems.map((item) => (
          <Card key={item.name} className="card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <Badge variant={item.status === "Compliant" ? "success" : "warning"}>{item.status}</Badge>
              </div>
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">Compliance Score</span>
                  <span className="font-bold">{item.score}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                  <div className={`h-full rounded-full ${item.score >= 90 ? "bg-emerald-500" : item.score >= 75 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                <span>Last: {item.lastAudit}</span>
                <span>Next: {item.nextAudit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle className="text-lg">Audit Log</CardTitle><CardDescription>Immutable record of all system mutations</CardDescription></div>
            <div className="flex gap-2">
              <div className="relative w-64"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" /><Input placeholder="Search logs..." className="pl-9" id="audit-search" /></div>
              <Button variant="outline" size="icon" id="audit-filter"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">User</th>
                <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Action</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Module</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Details</th>
                <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Severity</th>
              </tr></thead>
              <tbody>{auditLogs.map((log, i) => (
                <tr key={i} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                  <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3 font-medium">{log.user}</td>
                  <td className="px-4 py-3 text-center"><Badge variant="outline" className="font-mono text-[10px]">{log.action}</Badge></td>
                  <td className="px-4 py-3"><Badge variant="secondary">{log.module}</Badge></td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-xs truncate">{log.details}</td>
                  <td className="px-4 py-3 text-center"><SeverityBadge severity={log.severity} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* GDPR Requests */}
      <Card>
        <CardHeader><CardTitle className="text-lg">GDPR Data Subject Requests</CardTitle><CardDescription>Track and manage data subject access requests</CardDescription></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Request ID</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Data Subject</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Received</th>
                <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Deadline</th>
                <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
              </tr></thead>
              <tbody>{gdprRequests.map((req) => (
                <tr key={req.id} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                  <td className="px-4 py-3 font-mono text-xs font-medium">{req.id}</td>
                  <td className="px-4 py-3">{req.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{req.subject}</td>
                  <td className="px-4 py-3 font-mono text-xs">{req.received}</td>
                  <td className="px-4 py-3 font-mono text-xs">{req.deadline}</td>
                  <td className="px-4 py-3 text-center"><Badge variant={req.status === "Completed" ? "success" : req.status === "Pending" ? "warning" : "default"}>{req.status}</Badge></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
