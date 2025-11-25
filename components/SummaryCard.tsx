import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'savings';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type }) => {
  let bgColorClass = '';
  let textColorClass = 'text-gray-800'; // Default text color

  if (type === 'income') {
    bgColorClass = 'bg-green-100 border-green-400';
    textColorClass = 'text-green-700';
  } else if (type === 'expense') {
    bgColorClass = 'bg-red-100 border-red-400';
    textColorClass = 'text-red-700';
  } else if (type === 'savings') {
    bgColorClass = 'bg-blue-100 border-blue-400';
    textColorClass = amount >= 0 ? 'text-blue-700' : 'text-red-700'; // Red for negative savings
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className={`p-6 rounded-lg shadow-md border-l-4 ${bgColorClass}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className={`text-3xl font-bold ${textColorClass}`}>
        {formattedAmount}
      </p>
    </div>
  );
};