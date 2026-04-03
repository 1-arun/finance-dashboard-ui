# Finance Hub Dashboard

Finance Hub Dashboard is a responsive single-page finance workspace for tracking transactions, reviewing cash flow, and exploring spending insights through a polished, interview-ready UI.

It is designed as a frontend assessment project, but the implementation aims to feel like a product: clear information hierarchy, reusable components, lightweight state management, and realistic loading and error states.

## What It Does

- Dashboard overview with balance, income, and expense summary cards
- Balance trend and category spending visualizations
- Transaction management with add, edit, delete, search, filter, sort, and CSV export
- Insights page with computed financial metrics and duplicated chart views for analysis
- Role switching between `admin` and `viewer` to simulate permission-based UI
- Theme toggle with light/dark persistence
- Browser-side transaction persistence using `localStorage`
- Mock API behavior with simulated latency and occasional failures to exercise loading and error handling

## Why It Stands Out

- The app is split into focused routes for dashboard, transactions, and insights rather than a single dense screen
- State is centralized in a finance context, which keeps transaction logic, filters, totals, and permissions easy to reason about
- The transaction layer behaves like a real API while still being self-contained for frontend evaluation
- The UI uses a component-driven structure with reusable layout and dashboard pieces

## Tech Stack

- React 18 + JavaScript
- Vite 5
- Tailwind CSS
- shadcn/ui with Radix UI primitives
- React Router DOM
- Recharts
- TanStack Query provider in the app shell
- Vitest + Testing Library
- Playwright setup for E2E testing

## Core Screens

- Dashboard: high-level financial snapshot, charts, and recent activity
- Transactions: searchable, sortable transaction table with export and CRUD actions
- Insights: analytics-focused view with summary metrics and charts

## Project Structure

```text
src/
  api/
    transactionsApi.js   # mock API with latency, errors, and localStorage persistence
  components/
    dashboard/           # summary cards, charts, table, form, role/theme controls
    layout/              # app shell, sidebar, top navbar
    ui/                  # reusable shadcn/ui primitives
  context/
    FinanceContext.jsx   # global finance state, filters, totals, actions
  data/
    mockData.js          # seed transactions and chart data
  pages/
    DashboardPage.jsx
    TransactionsPage.jsx
    InsightsPage.jsx
  utils/
    formatters.js        # currency and date helpers
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the app at the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run build:dev` - build using the development mode config
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint
- `npm run test` - run the Vitest suite once
- `npm run test:watch` - run Vitest in watch mode

## Implementation Notes

- The transaction store uses `localStorage` with the key `finance-dashboard-data`
- `admin` can add, edit, and delete transactions
- `viewer` can inspect the data but does not get write controls
- Amounts and dates are formatted using Indian locale conventions (`en-IN`, `INR`)
- The mock API introduces a small random delay and simulated failures so the UI handles loading and error states realistically

## Interview Talking Points

- Clean separation between layout, pages, context, and data access
- Practical use of derived state for totals, filters, and chart-ready views
- Reusable UI composition instead of repeated page-specific markup
- Frontend-only persistence and API simulation that make the app easy to evaluate without a backend

## Future Improvements

- Replace the mock API with a real backend and authentication
- Add server-side persistence and user-specific transaction history
- Expand tests for context logic, CRUD flows, and export behavior
- Add more advanced filtering such as date ranges and multi-select categories
- Add accessibility polish and keyboard shortcuts for power users
- Add CI checks for lint, test, and build on every pull request

## Author

Built by Arun as a frontend dashboard project.
