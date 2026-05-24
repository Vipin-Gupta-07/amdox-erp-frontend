"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/finance": "Finance",
  "/hr": "HR & Payroll",
  "/supply-chain": "Supply Chain & Inventory",
  "/ai-forecasting": "AI Demand Forecasting",
  "/projects": "Project Management",
  "/analytics": "Business Intelligence",
  "/audit": "Audit & Compliance",
  "/notifications": "Notifications",
  "/settings": "Settings & Admin",
};

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentTitle = routeTitles[pathname] || "Dashboard";

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-md sm:px-6">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMobileMenuToggle}
        id="mobile-menu-toggle"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[var(--muted-foreground)]">Amdox ERP</span>
        <ChevronRight className="h-3 w-3 text-[var(--muted-foreground)]" />
        <span className="font-medium text-[var(--foreground)]">{currentTitle}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            id="global-search"
            placeholder="Search modules, reports..."
            className="w-[280px] pl-9 bg-[var(--muted)]/50 border-transparent focus:border-[var(--ring)] focus:bg-[var(--background)]"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] bg-[var(--muted)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">
            ⌘K
          </kbd>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSearchOpen(!searchOpen)}
          id="search-toggle"
        >
          <Search className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block" />

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          id="theme-toggle"
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          id="notification-bell"
          className="relative text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--destructive)] text-[9px] font-bold text-white">
            3
          </span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block" />

        {/* Tenant indicator */}
        <div className="hidden items-center gap-2 sm:flex">
          <Badge variant="outline" className="text-xs font-normal">
            Amdox Corp
          </Badge>
        </div>

        {/* User avatar */}
        <Avatar className="h-8 w-8 cursor-pointer transition-transform hover:scale-105">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            VA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
