# Finance Hub Dashboard

A responsive finance dashboard built as a frontend internship assignment project.

This application helps users track transactions, monitor income/expense trends, and view insights with an interactive, modern UI.

## Assignment Context

- Role target: Frontend Intern
- Project type: Single-page dashboard app
- Focus areas: UI implementation, state management, charts, filtering, and clean component architecture

## Demo Highlights

- Dashboard with summary cards for balance, income, and expenses
- Chart visualizations for balance trend and spending by category
- Transaction management (add, edit, delete)
- Search, filter, and sort transactions
- CSV export for transaction data
- Insights page with computed financial metrics
- Role switching (`admin` / `viewer`) for permission simulation
- Theme toggle (light/dark) with preference persistence
- Data persistence in browser `localStorage`

## Tech Stack

- React 18 + JavaScript
- Vite 5
- Tailwind CSS + shadcn/ui (Radix UI primitives)
- React Router DOM
- Recharts (data visualization)
- TanStack Query provider setup
- Vitest + Testing Library
- Playwright (E2E setup available)

## Project Structure

```text
src/
  components/
    dashboard/      # charts, tables, forms, summary, role/theme controls
    layout/         # sidebar, top navbar, app shell
    ui/             # reusable shadcn/ui primitives
  context/
    FinanceContext.js    # global state, filters, totals, persistence
  data/
    mockData.js          # seeded transaction and chart data
  pages/
    DashboardPage.js
    TransactionsPage.js
    InsightsPage.js
  utils/
    formatters.js        # currency/date format helpers
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd finance-dashboard
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open the app at the local URL shown by Vite (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run build:dev` - Development-mode build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests once
- `npm run test:watch` - Run tests in watch mode

## Functional Notes

- Transactions are persisted in `localStorage` under key `finance-dashboard-data`.
- `admin` role can add/edit/delete transactions.
- `viewer` role can review data but has restricted controls.
- Currency/date formatting uses Indian locale conventions (`en-IN`, `INR`).

## What I Focused On

- Building reusable and composable UI components
- Maintaining clean separation between layout, pages, and domain logic
- Keeping interactions smooth and responsive across screen sizes
- Implementing practical data handling: filtering, sorting, and export

## Potential Improvements

- Add backend integration (auth + persistent database)
- Add pagination and advanced filtering (date range, multi-category)
- Increase unit/integration test coverage for context and critical flows
- Add accessibility audit improvements (keyboard shortcuts, ARIA refinements)
- Add CI pipeline for lint/test/build checks

## Author

Prepared as a frontend internship assignment project by Arun.
