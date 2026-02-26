import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

// 1. Описуємо тип одного запису контрибуції
export interface Contribution {
  date: string;
  count: number;
}

// 2. Типізуємо пропси компонента
interface ContributionsChartProps {
  contributions: Contribution[];
}

const ContributionsChart: React.FC<ContributionsChartProps> = ({ contributions }) => {
  return (
    <div className="w-full rounded-2xl p-5 backdrop-blur-md bg-white shadow-md dark:bg-[#1C1C1C] dark:shadow-none overflow-hidden mt-5 transition-colors duration-300">
      <h3 className="text-[#15014b] dark:text-white text-[20px] font-semibold tracking-[1.5px] text-center mb-[15px]">
        Статистика активності
      </h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={contributions} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.9} />
              <stop offset="50%" stopColor="#82ca9d" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          {/* Використовуємо stroke="#888" для нейтрального вигляду вісей на обох темах */}
          <XAxis 
            dataKey="date" 
            stroke="#888" 
            tick={{ fill: '#888', fontSize: 12 }} 
            tickLine={false}
          />
          <YAxis 
            domain={[0, 'dataMax + 3']} 
            stroke="#888" 
            tick={{ fill: '#888', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          
          {/* Стилізуємо Tooltip через пропси, замість CSS */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              borderRadius: '8px', 
              padding: '10px', 
              border: 'none',
              color: '#fff' 
            }}
            itemStyle={{ color: '#82ca9d', fontWeight: 'bold' }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '5px', color: '#ccc' }}
          />
          
          <Area
            type="natural"
            dataKey="count"
            stroke="#82ca9d"
            fill="url(#colorGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#82ca9d", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContributionsChart;