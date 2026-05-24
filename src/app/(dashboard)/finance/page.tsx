"use client";

import {
  DollarSign,
  FileText,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Wallet,
  Landmark,
  Receipt,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const summaryCards = [
  { title: "Total Assets", value: "$12.8M", change: "+8.2%", trend: "up", icon: Landmark, color: "from-blue-500 to-indigo-600" },
  { title: "Total Liabilities", value: "$4.2M", change: "+2.1%", trend: "up", icon: Wallet, color: "from-amber-500 to-orange-600" },
  { title: "Net Income", value: "$2.4M", change: "+18.3%", trend: "up", icon: TrendingUp, color: "from-emerald-500 to-teal-600" },
  { title: "Cash Flow", value: "$890K", change: "-4.5%", trend: "down", icon: DollarSign, color: "from-violet-500 to-purple-600" },
];

const glEntries = [
  { date: "2024-12-15", account: "1000 - Cash", description: "Client payment received", debit: "$45,000", credit: "-", balance: "$234,500", status: "Posted" },
  { date: "2024-12-14", account: "5100 - Salary Expense", description: "December payroll", debit: "$128,000", credit: "-", balance: "$128,000", status: "Posted" },
  { date: "2024-12-14", account: "2000 - Accounts Payable", description: "Vendor payment - TechCorp", debit: "-", credit: "$22,500", balance: "$67,800", status: "Posted" },
  { date: "2024-12-13", account: "4000 - Revenue", description: "Service revenue - Q4", debit: "-", credit: "$85,000", balance: "$1,245,000", status: "Posted" },
  { date: "2024-12-12", account: "5200 - Rent Expense", description: "Office rent - December", debit: "$15,000", credit: "-", balance: "$180,000", status: "Pending" },
  { date: "2024-12-11", account: "1200 - Equipment", description: "Server purchase", debit: "$32,000", credit: "-", balance: "$156,000", status: "Draft" },
  { date: "2024-12-10", account: "5300 - Utilities", description: "Electricity bill", debit: "$3,200", credit: "-", balance: "$38,400", status: "Posted" },
  { date: "2024-12-09", account: "4000 - Revenue", description: "Consulting fees", debit: "-", credit: "$52,000", balance: "$1,160,000", status: "Posted" },
];

const apInvoices = [
  { id: "AP-2024-045", vendor: "TechCorp Solutions", amount: "$22,500", due: "2024-12-20", status: "Pending" },
  { id: "AP-2024-044", vendor: "CloudHost Inc.", amount: "$8,900", due: "2024-12-18", status: "Overdue" },
  { id: "AP-2024-043", vendor: "Office Supplies Co.", amount: "$1,250", due: "2024-12-25", status: "Pending" },
  { id: "AP-2024-042", vendor: "Legal Associates", amount: "$15,000", due: "2024-12-15", status: "Paid" },
  { id: "AP-2024-041", vendor: "Marketing Agency", amount: "$35,000", due: "2024-12-10", status: "Paid" },
  { id: "AP-2024-040", vendor: "Insurance Corp", amount: "$12,000", due: "2025-01-05", status: "Pending" },
];

const arInvoices = [
  { id: "INV-2024-089", customer: "Acme Corporation", amount: "$45,000", issued: "2024-12-01", due: "2024-12-31", status: "Outstanding" },
  { id: "INV-2024-088", customer: "GlobalTech Ltd.", amount: "$28,000", issued: "2024-11-28", due: "2024-12-28", status: "Outstanding" },
  { id: "INV-2024-087", customer: "StartupXYZ", amount: "$12,500", issued: "2024-11-25", due: "2024-12-25", status: "Paid" },
  { id: "INV-2024-086", customer: "MegaCorp Industries", amount: "$67,000", issued: "2024-11-20", due: "2024-12-20", status: "Overdue" },
  { id: "INV-2024-085", customer: "DataFlow Systems", amount: "$18,900", issued: "2024-11-15", due: "2024-12-15", status: "Paid" },
  { id: "INV-2024-084", customer: "NovaTech", amount: "$33,000", issued: "2024-11-10", due: "2024-12-10", status: "Paid" },
];

function StatusBadge({ status }: { status: string }) {
  const variant = status === "Posted" || status === "Paid" ? "success" : status === "Overdue" ? "destructive" : status === "Draft" ? "secondary" : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}

export default function FinancePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-[var(--muted-foreground)]">General ledger, accounts payable & receivable</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" id="finance-export-btn">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button id="finance-new-entry-btn">
            <Plus className="h-4 w-4" /> New Journal Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="card-hover" id={`finance-${card.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-[var(--muted-foreground)]">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {card.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={card.trend === "up" ? "text-emerald-600" : "text-red-600"}>{card.change}</span>
                  </div>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="gl" className="space-y-4">
        <TabsList id="finance-tabs">
          <TabsTrigger value="gl" id="tab-gl">General Ledger</TabsTrigger>
          <TabsTrigger value="ap" id="tab-ap">Accounts Payable</TabsTrigger>
          <TabsTrigger value="ar" id="tab-ar">Accounts Receivable</TabsTrigger>
        </TabsList>

        {/* General Ledger */}
        <TabsContent value="gl">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Landmark className="h-5 w-5" /> General Ledger
              </CardTitle>
              <CardDescription>Journal entries and account transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Date</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Account</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Description</th>
                      <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Debit</th>
                      <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Credit</th>
                      <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Balance</th>
                      <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {glEntries.map((entry, i) => (
                      <tr key={i} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-mono text-xs">{entry.date}</td>
                        <td className="px-4 py-3 font-medium">{entry.account}</td>
                        <td className="px-4 py-3 text-[var(--muted-foreground)]">{entry.description}</td>
                        <td className="px-4 py-3 text-right font-mono">{entry.debit}</td>
                        <td className="px-4 py-3 text-right font-mono">{entry.credit}</td>
                        <td className="px-4 py-3 text-right font-mono font-medium">{entry.balance}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={entry.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Payable */}
        <TabsContent value="ap">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="h-5 w-5" /> Accounts Payable
              </CardTitle>
              <CardDescription>Outstanding vendor invoices and payment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Invoice #</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Vendor</th>
                      <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Amount</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Due Date</th>
                      <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                      <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apInvoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-mono text-xs font-medium">{inv.id}</td>
                        <td className="px-4 py-3">{inv.vendor}</td>
                        <td className="px-4 py-3 text-right font-mono font-medium">{inv.amount}</td>
                        <td className="px-4 py-3 font-mono text-xs">{inv.due}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={inv.status} /></td>
                        <td className="px-4 py-3 text-center">
                          <Button variant="ghost" size="sm"><ArrowUpRight className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Receivable */}
        <TabsContent value="ar">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" /> Accounts Receivable
              </CardTitle>
              <CardDescription>Customer invoices and aging reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Invoice #</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Customer</th>
                      <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Amount</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Issued</th>
                      <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Due Date</th>
                      <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arInvoices.map((inv) => (
                      <tr key={inv.id} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-mono text-xs font-medium">{inv.id}</td>
                        <td className="px-4 py-3">{inv.customer}</td>
                        <td className="px-4 py-3 text-right font-mono font-medium">{inv.amount}</td>
                        <td className="px-4 py-3 font-mono text-xs">{inv.issued}</td>
                        <td className="px-4 py-3 font-mono text-xs">{inv.due}</td>
                        <td className="px-4 py-3 text-center"><StatusBadge status={inv.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* AR Aging Report */}
              <div className="mt-6 rounded-lg border border-[var(--border)] p-4">
                <h4 className="mb-3 text-sm font-semibold">Aging Report</h4>
                <div className="space-y-2">
                  {[
                    { label: "0–30 days", value: 73500, pct: 40 },
                    { label: "31–60 days", value: 67000, pct: 36 },
                    { label: "61–90 days", value: 33000, pct: 18 },
                    { label: "90+ days", value: 12500, pct: 6 },
                  ].map((bucket) => (
                    <div key={bucket.label} className="flex items-center gap-3 text-sm">
                      <span className="w-20 text-[var(--muted-foreground)]">{bucket.label}</span>
                      <div className="flex-1 h-3 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                          style={{ width: `${bucket.pct}%` }}
                        />
                      </div>
                      <span className="w-20 text-right font-mono font-medium">${(bucket.value / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
