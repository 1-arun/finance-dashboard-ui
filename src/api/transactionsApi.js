import { initialTransactions } from "@/data/mockData";
const STORAGE_KEY = "finance-dashboard-data";
const MIN_DELAY_MS = 350;
const MAX_DELAY_MS = 900;
const FAILURE_RATE = 0.12;
export class MockApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "MockApiError";
    this.code = code;
  }
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = () =>
  Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
const maybeThrowNetworkError = () => {
  if (Math.random() < FAILURE_RATE) {
    throw new MockApiError(
      "Request failed due to a simulated network issue. Please retry.",
      "NETWORK_ERROR",
    );
  }
};
const readTransactionsFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions));
      return [...initialTransactions];
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      throw new MockApiError(
        "Stored transactions are invalid.",
        "INVALID_DATA",
      );
    }
    return parsed;
  } catch (error) {
    if (error instanceof MockApiError) {
      throw error;
    }
    throw new MockApiError(
      "Could not read transaction data from storage.",
      "READ_ERROR",
    );
  }
};
const writeTransactionsToStorage = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    throw new MockApiError(
      "Could not persist transaction data.",
      "WRITE_ERROR",
    );
  }
};
export const transactionsApi = {
  async getTransactions() {
    await sleep(randomDelay());
    maybeThrowNetworkError();
    return readTransactionsFromStorage();
  },
  async createTransaction(tx) {
    await sleep(randomDelay());
    maybeThrowNetworkError();
    const transactions = readTransactionsFromStorage();
    const created = { ...tx, id: crypto.randomUUID() };
    writeTransactionsToStorage([created, ...transactions]);
    return created;
  },
  async updateTransaction(id, updates) {
    await sleep(randomDelay());
    maybeThrowNetworkError();
    const transactions = readTransactionsFromStorage();
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new MockApiError("Transaction not found.", "NOT_FOUND");
    }
    const updated = { ...transactions[index], ...updates };
    transactions[index] = updated;
    writeTransactionsToStorage(transactions);
    return updated;
  },
  async deleteTransaction(id) {
    await sleep(randomDelay());
    maybeThrowNetworkError();
    const transactions = readTransactionsFromStorage();
    const exists = transactions.some((t) => t.id === id);
    if (!exists) {
      throw new MockApiError("Transaction not found.", "NOT_FOUND");
    }
    writeTransactionsToStorage(transactions.filter((t) => t.id !== id));
  },
};
