import React, { useState } from 'react';
import { TransactionType } from '../types';
import { Button } from './Button';

interface TransactionFormProps {
  type: TransactionType;
  onClose: () => void;
  onAddTransaction: (transaction: { type: TransactionType; amount: number; description: string }) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ type, onClose, onAddTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (description.trim() === '') {
      setError('Please enter a description.');
      return;
    }

    onAddTransaction({
      type,
      amount: parsedAmount,
      description: description.trim(),
    });
    onClose();
  };

  const title = type === TransactionType.INCOME ? 'Add New Income' : 'Add New Expense';
  const buttonColor = type === TransactionType.INCOME ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 100.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0.01"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Monthly Salary, Groceries"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${buttonColor} text-white`}
            >
              Add {type === TransactionType.INCOME ? 'Income' : 'Expense'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};