import { FinanceProvider } from "@/context/FinanceContext";
import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "./DashboardPage";
import TransactionsPage from "./TransactionsPage";
import InsightsPage from "./InsightsPage";

const Index = () => (
  <FinanceProvider>
    <AppLayout>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="insights" element={<InsightsPage />} />
      </Routes>
    </AppLayout>
  </FinanceProvider>
);

export default Index;
