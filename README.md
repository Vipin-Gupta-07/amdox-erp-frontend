# 🏢 Amdox ERP Suite — AI-Powered Cloud Enterprise Resource Planning

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Next-generation intelligent resource planning platform delivering financial management, supply chain automation, HR & payroll, AI demand forecasting, project tracking, and business intelligence.**

[Live Demo](https://amdox-erp-frontend.vercel.app/) ·

</div>

----------------------------------------------------------

## 📋 Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Module Breakdown](#module-breakdown)
- [Design System](#design-system)

---

## Overview

A scalable, AI-augmented, multi-tenant ERP platform purpose-built for mid-market and enterprise organisations. This repository contains the **complete frontend** built with Next.js 15, React 19, and TypeScript — featuring 12 functional modules with enterprise-grade UI/UX.

**Project Code:** AMX-ERP-2026-04  
**Organization:** Amdox Technologies — Engineering Division  
**Target SLA:** 99.9% uptime | < 300ms P95 API latency | SOC 2 Type II aligned

---

## Tech Stack

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Framework** | Next.js 15 (App Router) | SSR/SSG, React Server Components, optimized routing |
| **UI Library** | React 19 + TypeScript 5.5 | Type-safe components with latest React features |
| **Styling** | Tailwind CSS 4 | Utility-first, rapid development, design tokens |
| **Components** | shadcn/ui + Radix UI | Accessible, unstyled primitives with custom theming |
| **Charts** | Recharts | React-native charting for dashboards and analytics |
| **Icons** | Lucide React | Consistent, lightweight icon set |
| **Fonts** | Inter + JetBrains Mono | Clean UI typography + monospace for data |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client Layer                      │
│         Next.js 15 SPA/SSR (App Router)             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Layout   │ │  Pages   │ │   UI     │            │
│  │ (Sidebar  │ │(12 Module│ │Components│            │
│  │  Header)  │ │  Pages)  │ │(shadcn)  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
├─────────────────────────────────────────────────────┤
│              State Management (Future)               │
│         Zustand (client) + TanStack Query (server)  │
├─────────────────────────────────────────────────────┤
│                   API Layer (Future)                  │
│     REST (OpenAPI 3.1) + GraphQL (Apollo v4)        │
├─────────────────────────────────────────────────────┤
│              Backend Services (Future)               │
│  NestJS 11 │ PostgreSQL 17 │ Redis 8 │ Keycloak 25 │
└─────────────────────────────────────────────────────┘
```

---------------

## Features

### 🔐 Authentication (F-01)
- Premium split-layout login with animated gradient background
- SSO integration placeholders (SAML 2.0 / OIDC)
- MFA enforcement UI with OTP input
- Google and enterprise SSO buttons

### 💰 Financial Management (F-02, F-03)
- General Ledger with journal entries and double-entry validation
- Accounts Payable — vendor invoices, 3-way matching
- Accounts Receivable — customer invoicing, aging reports
- Multi-currency support indicators

### 👥 HR & Payroll (F-04)
- Employee directory with avatar, department, role, status
- Payroll processing dashboard with history
- Leave management with balance tracking
- Attendance monitoring (check-in/out, late detection)

### 📦 Supply Chain & Inventory (F-05)
- Purchase order pipeline (Draft → Submitted → Approved → In Transit → Delivered)
- Real-time inventory cards with stock level indicators
- Vendor directory with star ratings and spend tracking
- Low stock alerts with visual warnings

### 🤖 AI Demand Forecasting (F-06)
- Interactive forecast chart with confidence bands (Recharts)
- Model accuracy metrics (MAPE, RMSE, R²)
- SKU-level prediction table with trend indicators
- Training history and model performance tracking

### 📋 Project Management (F-07)
- Project cards with progress bars, budget tracking, team size
- Priority and status badges (Critical, High, On Track, At Risk)
- Milestone timeline with status indicators
- Resource allocation overview

### 📈 Business Intelligence (F-08)
- Chart type selector (Bar, Pie, Line, Dashboard)
- Revenue by department bar chart
- Expense breakdown donut chart
- Scheduled report management table

### 🔒 Audit & Compliance (F-09)
- Immutable audit log with severity levels and search
- Compliance score cards (SOC 2, GDPR, ISO 27001, OWASP)
- GDPR Data Subject Request tracker
- Tamper-evident logging indicators

### 🔔 Notification Engine (F-10)
- Real-time notification feed with read/unread states
- Module-specific color-coded notification icons
- Channel preference matrix (In-App, Email, SMS, Webhook)

### ⚙️ Settings & Administration
- General settings (org name, timezone, currency, fiscal year)
- User management table with role assignment
- RBAC permission matrix (Super Admin, Tenant Admin, Manager, Viewer)
- Tenant configuration (SSO provider, data residency)
- API key management with status tracking
- Security policies with toggle controls (MFA, session timeout, rate limiting)

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Vipin-Gupta-07/amdox-erp-frontend.git
cd amdox-erp-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the live deployment at [amdox-erp-frontend.vercel.app](https://amdox-erp-frontend.vercel.app/).

### Build for Production

```bash
npm run build
npm start
```

--------

## Project Structure

```
amdox-erp/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx              # Auth layout (no sidebar)
│   │   │   └── login/page.tsx          # Login page
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx              # Dashboard layout (sidebar + header)
│   │   │   ├── page.tsx                # Executive Dashboard
│   │   │   ├── finance/page.tsx        # Financial Management
│   │   │   ├── hr/page.tsx             # HR & Payroll
│   │   │   ├── supply-chain/page.tsx   # Supply Chain & Inventory
│   │   │   ├── ai-forecasting/page.tsx # AI Demand Forecasting
│   │   │   ├── projects/page.tsx       # Project Management
│   │   │   ├── analytics/page.tsx      # Business Intelligence
│   │   │   ├── audit/page.tsx          # Audit & Compliance
│   │   │   ├── notifications/page.tsx  # Notification Center
│   │   │   └── settings/page.tsx       # Settings & Admin
│   │   ├── globals.css                 # Design system & theme variables
│   │   └── layout.tsx                  # Root layout
│   ├── components/
│   │   ├── layout/
│   │   │   ├── sidebar.tsx             # Collapsible navigation sidebar
│   │   │   ├── header.tsx              # Top bar with search & notifications
│   │   │   └── app-layout.tsx          # Main layout wrapper
│   │   └── ui/                         # shadcn/ui component library
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── badge.tsx
│   │       ├── tabs.tsx
│   │       ├── avatar.tsx
│   │       └── separator.tsx
│   └── lib/
│       └── utils.ts                    # Utility functions (cn helper)
├── public/                             # Static assets
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

---

## Module Breakdown

| # | Module | Route | Features |
|---|--------|-------|----------|
| F-01 | Auth & SSO | `/login` | MFA, SSO, Google login |
| F-02 | Financial Ledger | `/finance` | GL, AP/AR, aging reports |
| F-04 | HR & Payroll | `/hr` | Employees, payroll, leave, attendance |
| F-05 | Supply Chain | `/supply-chain` | POs, inventory, vendors |
| F-06 | AI Forecasting | `/ai-forecasting` | ML predictions, model metrics |
| F-07 | Project Management | `/projects` | Projects, milestones, budgets |
| F-08 | Business Intelligence | `/analytics` | Charts, dashboards, reports |
| F-09 | Audit & Compliance | `/audit` | Audit log, GDPR, compliance |
| F-10 | Notifications | `/notifications` | Alerts, channel preferences |
| — | Settings | `/settings` | Users, roles, security, API keys |

---

## Design System

### Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `#1E40AF` | `#3B82F6` | Buttons, links, active states |
| Success | `#10B981` | `#059669` | Positive indicators, approvals |
| Warning | `#F59E0B` | `#D97706` | Alerts, pending states |
| Destructive | `#EF4444` | `#7F1D1D` | Errors, critical alerts |
| Sidebar BG | `#0F172A` | `#020617` | Navigation sidebar |
| Content BG | `#F8FAFC` | `#020617` | Main content area |

### Responsive Breakpoints

| Breakpoint | Width | Layout Change |
|-----------|-------|---------------|
| Mobile | < 640px | Single column, sidebar drawer |
| Tablet | 640–1024px | Two columns, sidebar overlay |
| Desktop | > 1024px | Full layout, sidebar visible |

---

## 📄 License

This project is developed as part of the Amdox Technologies Engineering Division internship program.

---

<div align="center">
  <strong>Crafted with precision and modern engineering principles</strong><br/>
  Amdox Technologies • Engineering Division • 2026
</div>
