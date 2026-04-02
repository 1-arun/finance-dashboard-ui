import TransactionsTable from "@/components/dashboard/TransactionsTable";

const TransactionsPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and review all your transactions.</p>
      </div>
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
