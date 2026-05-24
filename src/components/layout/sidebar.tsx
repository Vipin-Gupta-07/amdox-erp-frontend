"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Package,
  Brain,
  FolderKanban,
  BarChart3,
  Shield,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "HR & Payroll", href: "/hr", icon: Users },
  { name: "Supply Chain", href: "/supply-chain", icon: Package },
  { name: "AI Forecasting", href: "/ai-forecasting", icon: Brain },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Audit & Compliance", href: "/audit", icon: Shield },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar-background)] text-[var(--sidebar-foreground)] transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
          <Hexagon className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="text-sm font-bold tracking-wide text-white">AMDOX</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
              ERP Suite
            </span>
          </div>
        )}
      </div>

      <Separator className="bg-[var(--sidebar-border)]" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              id={`nav-${item.href.replace(/\//g, "").replace(/-/g, "_") || "dashboard"}`}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[var(--sidebar-primary)]/15 text-[var(--sidebar-primary)] shadow-sm"
                  : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-[var(--sidebar-primary)]"
                    : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-[var(--sidebar-border)]" />

      {/* User section */}
      <div className={cn("p-3", collapsed ? "flex flex-col items-center gap-2" : "")}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--sidebar-accent)]",
            collapsed && "justify-center p-2"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-white">
              VA
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-1 flex-col animate-fade-in">
              <span className="text-sm font-medium text-white">Vipin Admin</span>
              <span className="text-xs text-slate-400">Super Admin</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        id="sidebar-toggle"
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] shadow-sm transition-colors hover:bg-[var(--accent)] hover:text-[var(--foreground)] cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}
