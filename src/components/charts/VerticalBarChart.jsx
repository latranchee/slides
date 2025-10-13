import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

const COLORS = {
  accent: '#E94560',
  success: '#00D9A3',
  warning: '#FFB800',
  primary: '#1A1A2E',
  secondary: '#16213E',
  gray: '#9CA3AF',
};

const VerticalBarChart = ({ data, height = 500, xLabel, yLabel }) => {
  // data format: [{ name: 'Équipe sur place', value: 625, color: 'accent' }, ...]

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
          margin={{ top: 20, right: 30, left: 60, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            label={{ value: xLabel || '', position: 'insideBottom', offset: -20, style: { fontSize: 14, fontWeight: 'bold' } }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            label={{ value: yLabel || 'Coût ($)', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 'bold' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList dataKey="value" position="top" formatter={formatCurrency} style={{ fontSize: 14, fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarChart;
