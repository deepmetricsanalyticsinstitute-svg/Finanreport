import React from 'react';
import { Transaction, TransactionType } from '../types';
import { Button } from './Button';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No transactions recorded yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Recent Transactions</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map(transaction => (
          <li key={transaction.id} className="py-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <p className={`text-lg font-bold ${transaction.type === TransactionType.INCOME ? 'text-green-600' : 'text-red-600'}`}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(transaction.amount)}
              </p>
              <Button
                onClick={() => onDelete(transaction.id)}
                className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};