import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Transaction, TransactionType, SummaryData, PieChartDataItem } from './types';
import { LOCAL_STORAGE_KEY } from './constants';
import { getTransactionsFromLocalStorage, saveTransactionsToLocalStorage } from './services/localStorageService';

import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { PieChartCard } from './components/PieChartCard';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { Button } from './components/Button';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);

  // Load transactions from localStorage on initial mount
  useEffect(() => {
    const storedTransactions = getTransactionsFromLocalStorage();
    setTransactions(storedTransactions);
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    saveTransactionsToLocalStorage(transactions);
  }, [transactions]);

  const handleAddTransaction = useCallback((newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prevTransactions => [
      { ...newTransaction, id: uuidv4(), date: new Date().toISOString() },
      ...prevTransactions,
    ]);
    setIsIncomeFormOpen(false);
    setIsExpenseFormOpen(false);
  }, []);

  const handleDeleteTransaction = useCallback((id: string) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
  }, []);

  const calculateSummary = useCallback((): SummaryData => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
      if (transaction.type === TransactionType.INCOME) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });

    const totalSavings = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, totalSavings };
  }, [transactions]);

  const { totalIncome, totalExpenses, totalSavings } = useMemo(() => calculateSummary(), [calculateSummary]);

  const pieChartData = useMemo(() => {
    const data: PieChartDataItem[] = [];

    if (totalIncome > 0) {
      data.push({ name: 'Income', value: totalIncome, color: '#34D399' }); // Tailwind green-400
    }
    if (totalExpenses > 0) {
      data.push({ name: 'Expenses', value: totalExpenses, color: '#EF4444' }); // Tailwind red-500
    }
    // Only show 'Savings' slice if totalSavings is positive
    if (totalSavings > 0) {
      data.push({ name: 'Savings', value: totalSavings, color: '#60A5FA' }); // Tailwind blue-400
    } else if (totalIncome - totalExpenses < 0) {
      // If there's a deficit, we could represent it, but for a "savings" chart,
      // showing only income and expenses if savings are negative is clearer.
      // Or we can add a 'Deficit' slice if needed. For now, keep it simple.
    }

    return data;
  }, [totalIncome, totalExpenses, totalSavings]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-24"> {/* Added pb-24 for sticky buttons */}
      <Header />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 p-4 sm:p-0">
        {/* Summary Cards */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <SummaryCard title="Total Income" amount={totalIncome} type="income" />
          <SummaryCard title="Total Expenses" amount={totalExpenses} type="expense" />
          <SummaryCard title="Net Savings" amount={totalSavings} type="savings" />
        </div>

        {/* Chart and Transactions */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PieChartCard data={pieChartData} />
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </div>
      </div>

      {/* Sticky CTA buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg flex flex-col sm:flex-row justify-center gap-4 z-50 border-t border-gray-200">
        <Button onClick={() => setIsIncomeFormOpen(true)} className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
          Add Income
        </Button>
        <Button onClick={() => setIsExpenseFormOpen(true)} className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto">
          Add Expense
        </Button>
      </div>

      {/* Income Form Modal */}
      {isIncomeFormOpen && (
        <TransactionForm
          type={TransactionType.INCOME}
          onClose={() => setIsIncomeFormOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {/* Expense Form Modal */}
      {isExpenseFormOpen && (
        <TransactionForm
          type={TransactionType.EXPENSE}
          onClose={() => setIsExpenseFormOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}
    </div>
  );
}

export default App;