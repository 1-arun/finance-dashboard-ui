import InsightsSection from "@/components/dashboard/InsightsSection";
import SpendingByCategoryChart from "@/components/dashboard/SpendingByCategoryChart";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import { Lightbulb } from "lucide-react";

const InsightsPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-warning" />
        <div>
          <h1 className="text-2xl font-bold">Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Key financial metrics and analysis.
          </p>
        </div>
      </div>

      <InsightsSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart />
        <SpendingByCategoryChart />
      </div>
    </div>
  );
};

export default InsightsPage;
