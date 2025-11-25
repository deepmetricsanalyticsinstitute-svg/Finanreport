import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PieChartDataItem } from '../types';

interface PieChartCardProps {
  data: PieChartDataItem[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-gray-700">{item.name}: {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item.value)}</p>
      </div>
    );
  }
  return null;
};

export const PieChartCard: React.FC<PieChartCardProps> = ({ data }) => {
  // Filter out items with value 0 to prevent them from showing in the legend/chart
  const filteredData = data.filter(item => item.value > 0);

  if (filteredData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-80">
        <p className="text-gray-500 text-lg">No data to display in the chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Financial Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};