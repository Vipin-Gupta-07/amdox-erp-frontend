"use client";

import { Settings, Users, Key, Shield, Building2, Globe, Bell, Database, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const users = [
  { name: "Vipin Admin", email: "vipin@amdox.com", initials: "VA", role: "Super Admin", status: "Active", lastLogin: "2024-12-15 14:30", color: "from-blue-500 to-indigo-600" },
  { name: "Sarah Chen", email: "sarah.chen@amdox.com", initials: "SC", role: "Tenant Admin", status: "Active", lastLogin: "2024-12-15 13:15", color: "from-emerald-500 to-teal-500" },
  { name: "James Wilson", email: "james.w@amdox.com", initials: "JW", role: "Manager", status: "Active", lastLogin: "2024-12-15 11:30", color: "from-amber-500 to-orange-500" },
  { name: "Maya Patel", email: "maya.p@amdox.com", initials: "MP", role: "Viewer", status: "Active", lastLogin: "2024-12-14 16:45", color: "from-violet-500 to-purple-500" },
  { name: "David Kim", email: "david.k@amdox.com", initials: "DK", role: "Manager", status: "Inactive", lastLogin: "2024-12-10 09:00", color: "from-pink-500 to-rose-500" },
];

const apiKeys = [
  { name: "Production API Key", key: "ak-prod-92f4...a8b2", created: "2024-10-01", lastUsed: "2024-12-15", status: "Active" },
  { name: "Staging API Key", key: "ak-stg-7d3e...f1c9", created: "2024-11-15", lastUsed: "2024-12-14", status: "Active" },
  { name: "Webhook Integration", key: "ak-whk-1b5a...d4e7", created: "2024-09-20", lastUsed: "2024-12-15", status: "Active" },
  { name: "Legacy System Key", key: "ak-leg-8c2f...9a1b", created: "2024-03-01", lastUsed: "2024-11-28", status: "Revoked" },
];

const rolePermissions = [
  { module: "Dashboard", superAdmin: "Full", tenantAdmin: "Full", manager: "View", viewer: "View" },
  { module: "Finance", superAdmin: "Full", tenantAdmin: "Full", manager: "Edit", viewer: "View" },
  { module: "HR & Payroll", superAdmin: "Full", tenantAdmin: "Full", manager: "Edit", viewer: "View" },
  { module: "Supply Chain", superAdmin: "Full", tenantAdmin: "Full", manager: "Edit", viewer: "View" },
  { module: "AI Forecasting", superAdmin: "Full", tenantAdmin: "Full", manager: "View", viewer: "View" },
  { module: "Analytics", superAdmin: "Full", tenantAdmin: "Full", manager: "View", viewer: "View" },
  { module: "Audit Logs", superAdmin: "Full", tenantAdmin: "View", manager: "None", viewer: "None" },
  { module: "Settings", superAdmin: "Full", tenantAdmin: "Edit", manager: "None", viewer: "None" },
];

function PermBadge({ level }: { level: string }) {
  const map: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
    Full: "success", Edit: "warning", View: "secondary", None: "destructive",
  };
  return <Badge variant={map[level] || "secondary"} className="text-[10px] min-w-[45px] justify-center">{level}</Badge>;
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings & Admin</h1>
        <p className="text-[var(--muted-foreground)]">System configuration, user management & security policies</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="tenant">Tenant Config</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle className="text-lg">General Settings</CardTitle><CardDescription>Basic platform configuration</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input defaultValue="Amdox Technologies" id="settings-org-name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Domain</label>
                  <Input defaultValue="erp.amdox.com" id="settings-domain" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Support Email</label>
                  <Input defaultValue="support@amdox.com" id="settings-email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Timezone</label>
                  <Input defaultValue="Asia/Kolkata (UTC+5:30)" id="settings-timezone" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Currency</label>
                  <Input defaultValue="USD ($)" id="settings-currency" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fiscal Year Start</label>
                  <Input defaultValue="April" id="settings-fiscal" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end"><Button id="settings-save-btn">Save Changes</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between"><div><CardTitle className="text-lg">User Management</CardTitle><CardDescription>Manage users and their access levels</CardDescription></div><Button id="settings-add-user"><Users className="h-4 w-4" /> Add User</Button></div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">User</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Role</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Last Login</th>
                  </tr></thead>
                  <tbody>{users.map((u) => (
                    <tr key={u.email} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8"><AvatarFallback className={`bg-gradient-to-br ${u.color} text-[10px] font-bold text-white`}>{u.initials}</AvatarFallback></Avatar>
                          <div><p className="font-medium">{u.name}</p><p className="text-xs text-[var(--muted-foreground)]">{u.email}</p></div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="outline">{u.role}</Badge></td>
                      <td className="px-4 py-3 text-center"><Badge variant={u.status === "Active" ? "success" : "secondary"}>{u.status}</Badge></td>
                      <td className="px-4 py-3 font-mono text-xs">{u.lastLogin}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Role Permission Matrix</CardTitle><CardDescription>Access levels by role across modules</CardDescription></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Module</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Super Admin</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Tenant Admin</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Manager</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Viewer</th>
                  </tr></thead>
                  <tbody>{rolePermissions.map((rp) => (
                    <tr key={rp.module} className="border-b border-[var(--border)]">
                      <td className="px-4 py-3 font-medium">{rp.module}</td>
                      <td className="px-4 py-3 text-center"><PermBadge level={rp.superAdmin} /></td>
                      <td className="px-4 py-3 text-center"><PermBadge level={rp.tenantAdmin} /></td>
                      <td className="px-4 py-3 text-center"><PermBadge level={rp.manager} /></td>
                      <td className="px-4 py-3 text-center"><PermBadge level={rp.viewer} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenant">
          <Card>
            <CardHeader><CardTitle className="text-lg">Tenant Configuration</CardTitle><CardDescription>Multi-tenant settings and isolation policies</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-sm font-medium">Tenant ID</label><Input defaultValue="amdox-corp-001" readOnly className="font-mono bg-[var(--muted)]" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Tenant Name</label><Input defaultValue="Amdox Corporation" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">SSO Provider</label><Input defaultValue="Azure AD (OIDC)" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Data Residency</label><Input defaultValue="ap-south-1 (Mumbai)" /></div>
              </div>
              <Separator />
              <div className="flex justify-end"><Button>Save Configuration</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between"><div><CardTitle className="text-lg">API Keys</CardTitle><CardDescription>Manage API keys for integrations</CardDescription></div><Button id="settings-new-key"><Key className="h-4 w-4" /> Generate Key</Button></div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Key</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Created</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Last Used</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>{apiKeys.map((ak) => (
                    <tr key={ak.key} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3 font-medium">{ak.name}</td>
                      <td className="px-4 py-3 font-mono text-xs">{ak.key}</td>
                      <td className="px-4 py-3 font-mono text-xs">{ak.created}</td>
                      <td className="px-4 py-3 font-mono text-xs">{ak.lastUsed}</td>
                      <td className="px-4 py-3 text-center"><Badge variant={ak.status === "Active" ? "success" : "destructive"}>{ak.status}</Badge></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Security Policies</CardTitle><CardDescription>Authentication and access control settings</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Multi-Factor Authentication (MFA)", desc: "Require MFA for all users", enabled: true },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
                  { label: "Password Complexity", desc: "Minimum 12 characters, upper, lower, number, special", enabled: true },
                  { label: "IP Allowlist", desc: "Restrict access to approved IP ranges only", enabled: false },
                  { label: "Brute Force Protection", desc: "Lock account after 5 failed login attempts", enabled: true },
                  { label: "API Rate Limiting", desc: "100 requests per minute per API key", enabled: true },
                ].map((policy) => (
                  <div key={policy.label} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-4">
                    <div><p className="font-medium text-sm">{policy.label}</p><p className="text-xs text-[var(--muted-foreground)]">{policy.desc}</p></div>
                    <div className={`h-5 w-9 rounded-full ${policy.enabled ? "bg-emerald-500" : "bg-[var(--muted)]"} relative cursor-pointer`}>
                      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${policy.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
