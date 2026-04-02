export type TransactionType = "income" | "expense";
export type UserRole = "viewer" | "admin";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface FilterState {
  search: string;
  type: TransactionType | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}
