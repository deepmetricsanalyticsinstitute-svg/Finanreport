export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string; // ISO string for date
}

export interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
}

export interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
}