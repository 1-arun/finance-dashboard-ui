import { useState, useCallback, useMemo, useEffect } from "react";
import { initialTransactions } from "@/data/mockData";
import { transactionsApi } from "@/api/transactionsApi";
import { FinanceContext } from "@/context/finance-context";

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("admin");
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [filters, setFiltersState] = useState({
    search: "",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      setApiLoading(true);
      try {
        const loaded = await transactionsApi.getTransactions();
        if (!cancelled) {
          setTransactions(loaded);
          setApiError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setApiError(
            error instanceof Error
              ? error.message
              : "Failed to load transactions.",
          );
        }
      } finally {
        if (!cancelled) {
          setApiLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const setFilters = useCallback((partial) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const addTransaction = useCallback(async (tx) => {
    setApiLoading(true);
    try {
      const created = await transactionsApi.createTransaction(tx);
      setTransactions((prev) => [created, ...prev]);
      setApiError(null);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Failed to add transaction.",
      );
      throw error;
    } finally {
      setApiLoading(false);
    }
  }, []);

  const editTransaction = useCallback(async (id, updates) => {
    setApiLoading(true);
    try {
      const updated = await transactionsApi.updateTransaction(id, updates);
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? updated : transaction,
        ),
      );
      setApiError(null);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to update transaction.",
      );
      throw error;
    } finally {
      setApiLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    setApiLoading(true);
    try {
      await transactionsApi.deleteTransaction(id);
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id),
      );
      setApiError(null);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to delete transaction.",
      );
      throw error;
    } finally {
      setApiLoading(false);
    }
  }, []);

  const clearApiError = useCallback(() => {
    setApiError(null);
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.type !== "all") {
      result = result.filter(
        (transaction) => transaction.type === filters.type,
      );
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(query) ||
          transaction.category.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      const direction = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") {
        return (
          direction * (new Date(a.date).getTime() - new Date(b.date).getTime())
        );
      }
      return direction * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions],
  );

  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        filters,
        role,
        apiLoading,
        apiError,
        setRole,
        setFilters,
        addTransaction,
        editTransaction,
        deleteTransaction,
        clearApiError,
        filteredTransactions,
        totalIncome,
        totalExpenses,
        totalBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
