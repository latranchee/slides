import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  accent: '#E94560',
  success: '#00D9A3',
  warning: '#FFB800',
  primary: '#1A1A2E',
  secondary: '#16213E',
  gray: '#9CA3AF',
};

const SimplePieChart = ({ data, title, height = 400 }) => {
  // data format: [{ name: 'Equipment', value: 6, color: 'gray' }, { name: 'Salaries', value: 94, color: 'accent' }]

  const chartData = data.map(item => ({
    ...item,
    fill: COLORS[item.color] || item.color,
  }));

  // Custom label renderer for inside the pie
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    // Position label at 60% of radius (inside the slice)
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        className="font-bold text-sm"
      >
        <tspan x={x} dy="0">{name}</tspan>
        <tspan x={x} dy="1.2em">{`${(percent * 100).toFixed(0)}%`}</tspan>
      </text>
    );
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-2xl font-semibold text-center mb-6">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimplePieChart;
