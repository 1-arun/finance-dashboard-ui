import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingByCategoryChart from "@/components/dashboard/SpendingByCategoryChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

const DashboardPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's your financial overview.</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <SpendingByCategoryChart />
      </div>

      <RecentTransactions />
    </div>
  );
};

export default DashboardPage;
