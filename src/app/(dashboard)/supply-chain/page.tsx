"use client";

import { Package, Truck, AlertTriangle, Plus, Building2, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const poData = [
  { id: "PO-4521", vendor: "TechCorp Solutions", items: 12, value: "$45,200", created: "2024-12-10", delivery: "2024-12-20", status: "In Transit" },
  { id: "PO-4520", vendor: "CloudHost Inc.", items: 3, value: "$8,900", created: "2024-12-09", delivery: "2024-12-18", status: "Approved" },
  { id: "PO-4519", vendor: "Office Supplies Co.", items: 25, value: "$3,450", created: "2024-12-08", delivery: "2024-12-22", status: "Draft" },
  { id: "PO-4518", vendor: "Steel Manufacturing", items: 8, value: "$67,000", created: "2024-12-07", delivery: "2024-12-25", status: "Submitted" },
  { id: "PO-4517", vendor: "Logistics Partner", items: 5, value: "$12,800", created: "2024-12-06", delivery: "2024-12-19", status: "In Transit" },
  { id: "PO-4516", vendor: "Raw Materials Ltd.", items: 18, value: "$89,500", created: "2024-12-05", delivery: "2024-12-15", status: "Delivered" },
  { id: "PO-4515", vendor: "PackageCo", items: 50, value: "$5,200", created: "2024-12-04", delivery: "2024-12-14", status: "Delivered" },
];

const inventoryItems = [
  { name: "Widget Assembly Kit A", sku: "WDG-A001", stock: 245, max: 500, reorder: 100, status: "In Stock" },
  { name: "Circuit Board Module B", sku: "CBM-B012", stock: 42, max: 300, reorder: 50, status: "Low Stock" },
  { name: "Precision Bearing Set", sku: "PBS-C034", stock: 890, max: 1000, reorder: 200, status: "In Stock" },
  { name: "Hydraulic Pump Unit", sku: "HPU-D056", stock: 8, max: 100, reorder: 20, status: "Low Stock" },
  { name: "Steel Plate 4mm", sku: "STP-E078", stock: 0, max: 200, reorder: 30, status: "Out of Stock" },
  { name: "Cable Harness Assembly", sku: "CHA-F090", stock: 567, max: 800, reorder: 150, status: "In Stock" },
];

const vendors = [
  { name: "TechCorp Solutions", category: "Electronics", contact: "john@techcorp.com", rating: 5, activePOs: 3, spend: "$245K", status: "Active" },
  { name: "Steel Manufacturing", category: "Raw Materials", contact: "ops@steelmfg.com", rating: 4, activePOs: 2, spend: "$520K", status: "Active" },
  { name: "CloudHost Inc.", category: "IT Services", contact: "sales@cloudhost.io", rating: 4, activePOs: 1, spend: "$89K", status: "Active" },
  { name: "Office Supplies Co.", category: "Office", contact: "info@officesupplies.com", rating: 3, activePOs: 1, spend: "$12K", status: "Active" },
  { name: "Logistics Partner", category: "Logistics", contact: "dispatch@logpartner.com", rating: 5, activePOs: 2, spend: "$178K", status: "Active" },
  { name: "PackageCo", category: "Packaging", contact: "orders@packageco.com", rating: 3, activePOs: 0, spend: "$34K", status: "Inactive" },
];

const poPipeline = [
  { stage: "Draft", count: 8, color: "bg-slate-400" },
  { stage: "Submitted", count: 15, color: "bg-blue-500" },
  { stage: "Approved", count: 23, color: "bg-indigo-500" },
  { stage: "In Transit", count: 34, color: "bg-amber-500" },
  { stage: "Delivered", count: 9, color: "bg-emerald-500" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "destructive" | "secondary" | "default" | "outline"> = {
    "In Stock": "success", "Low Stock": "warning", "Out of Stock": "destructive",
    Active: "success", Inactive: "secondary", Draft: "secondary", Submitted: "default",
    Approved: "success", "In Transit": "warning", Delivered: "success",
  };
  return <Badge variant={map[status] || "outline"}>{status}</Badge>;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= count ? "fill-amber-400 text-amber-400" : "text-[var(--muted)]"}`} />
      ))}
    </div>
  );
}

export default function SupplyChainPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain & Inventory</h1>
          <p className="text-[var(--muted-foreground)]">Purchase orders, inventory management & vendor portal</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" id="sc-add-vendor"><Building2 className="h-4 w-4" /> Add Vendor</Button>
          <Button id="sc-new-po"><Plus className="h-4 w-4" /> New Purchase Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "Active POs", value: "89", icon: ShoppingCart, color: "from-blue-500 to-indigo-600" },
          { title: "Pending Deliveries", value: "34", icon: Truck, color: "from-amber-500 to-orange-600" },
          { title: "Low Stock Items", value: "12", icon: AlertTriangle, color: "from-red-500 to-rose-600" },
          { title: "Total Vendors", value: "156", icon: Building2, color: "from-emerald-500 to-teal-600" },
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

      <Tabs defaultValue="po" className="space-y-4">
        <TabsList><TabsTrigger value="po">Purchase Orders</TabsTrigger><TabsTrigger value="inventory">Inventory</TabsTrigger><TabsTrigger value="vendors">Vendors</TabsTrigger></TabsList>

        <TabsContent value="po">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
            {poPipeline.map((stage) => (
              <Card key={stage.stage} className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto mb-2 h-2 w-12 rounded-full ${stage.color}`} />
                  <p className="text-2xl font-bold">{stage.count}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{stage.stage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle className="text-lg">Purchase Orders</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">PO #</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Vendor</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Items</th>
                    <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Value</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Delivery</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>{poData.map((po) => (
                    <tr key={po.id} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3 font-mono text-xs font-medium">{po.id}</td>
                      <td className="px-4 py-3">{po.vendor}</td>
                      <td className="px-4 py-3 text-center">{po.items}</td>
                      <td className="px-4 py-3 text-right font-mono font-medium">{po.value}</td>
                      <td className="px-4 py-3 font-mono text-xs">{po.delivery}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={po.status} /></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryItems.map((item) => (
              <Card key={item.sku} className={`card-hover ${item.status === "Out of Stock" ? "border-red-300 dark:border-red-800" : item.status === "Low Stock" ? "border-amber-300 dark:border-amber-800" : ""}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><p className="font-semibold">{item.name}</p><p className="text-xs text-[var(--muted-foreground)] font-mono">{item.sku}</p></div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[var(--muted-foreground)]">Current Stock</span>
                    <span className="font-bold">{item.stock} <span className="text-xs font-normal text-[var(--muted-foreground)]">/ {item.max}</span></span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--muted)]">
                    <div className={`h-full rounded-full transition-all ${item.stock === 0 ? "bg-red-500" : item.stock < item.reorder ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.min((item.stock / item.max) * 100, 100)}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted-foreground)]">Reorder level: {item.reorder} units</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardHeader><CardTitle className="text-lg">Vendor Directory</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Vendor</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Category</th>
                    <th className="px-4 py-3 text-left font-medium text-[var(--muted-foreground)]">Contact</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Rating</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Active POs</th>
                    <th className="px-4 py-3 text-right font-medium text-[var(--muted-foreground)]">Total Spend</th>
                    <th className="px-4 py-3 text-center font-medium text-[var(--muted-foreground)]">Status</th>
                  </tr></thead>
                  <tbody>{vendors.map((v) => (
                    <tr key={v.name} className="border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3 font-medium">{v.name}</td>
                      <td className="px-4 py-3"><Badge variant="outline">{v.category}</Badge></td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{v.contact}</td>
                      <td className="px-4 py-3"><Stars count={v.rating} /></td>
                      <td className="px-4 py-3 text-center font-medium">{v.activePOs}</td>
                      <td className="px-4 py-3 text-right font-mono font-medium">{v.spend}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={v.status} /></td>
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
