import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
  accent: '#E94560',
  success: '#00D9A3',
  warning: '#FFB800',
  primary: '#1A1A2E',
  secondary: '#16213E',
  gray: '#9CA3AF',
};

const HorizontalBarChart = ({ data, height = 400, xLabel, yLabel }) => {
  // data format: [{ name: 'Équipe sur place', value: 3750, color: 'accent' }, ...]

  const chartData = data.map(item => ({
    ...item,
    fill: COLORS[item.color] || item.color || COLORS.accent,
  }));

  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K$`;
    }
    return `${value}$`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-bold mb-1">{payload[0].payload.name}</p>
          <p className="font-mono font-bold text-accent">{formatCurrency(payload[0].value)}</p>
          {payload[0].payload.description && (
            <p className="text-sm text-gray-600 mt-1">{payload[0].payload.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 150, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            type="number"
            tickFormatter={formatCurrency}
            label={{ value: xLabel || 'Coût ($)', position: 'insideBottom', offset: -10, style: { fontSize: 14, fontWeight: 'bold' } }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            label={{ value: yLabel || '', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 'bold' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
