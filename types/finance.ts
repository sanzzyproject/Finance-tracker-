export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id?: number;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string; // ISO String
}

export interface MonthlyStats {
  income: number;
  expense: number;
  balance: number;
}
