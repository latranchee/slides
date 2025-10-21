import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const BellCurve = ({ data, highlight, xLabel, yLabel, height = 400, hideLabels = false }) => {
  // data format: [{ x: 500, y: 0.1 }, { x: 2500, y: 0.8 }, ...]
  // highlight: { min: 2500, max: 5000, label: "2.5K - 5K" }

  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K$`;
    }
    return `${value}$`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-mono font-bold">{formatCurrency(payload[0].payload.x)}</p>
          <p className="text-sm text-gray-600">Fréquence: {(payload[0].value * 100).toFixed(0)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <defs>
            <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E94560" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#E94560" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="x"
            tick={hideLabels ? false : undefined}
            tickFormatter={hideLabels ? undefined : formatCurrency}
            label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -10, style: { fontSize: 14, fontWeight: 'bold' } } : undefined}
            angle={hideLabels ? 0 : -45}
            textAnchor={hideLabels ? 'middle' : 'end'}
            height={hideLabels ? 40 : 80}
          />
          <YAxis
            tick={hideLabels ? false : undefined}
            tickFormatter={hideLabels ? undefined : (value) => `${(value * 100).toFixed(0)}%`}
            label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 'bold' } } : undefined}
          />
          <Tooltip content={<CustomTooltip />} />

          {highlight && (
            <>
              <ReferenceLine
                x={highlight.min}
                stroke="#00D9A3"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <ReferenceLine
                x={highlight.max}
                stroke="#00D9A3"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </>
          )}

          <Area
            type="monotone"
            dataKey="y"
            stroke="#E94560"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorFreq)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {highlight && (
        <div className="text-center mt-4">
          <div className="inline-block bg-success/10 border-2 border-success px-6 py-3 rounded-xl">
            <p className="text-lg font-bold text-success">
              Zone typique: {formatCurrency(highlight.min)} - {formatCurrency(highlight.max)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BellCurve;
