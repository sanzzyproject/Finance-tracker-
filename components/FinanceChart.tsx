'use client';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Transaction } from '@/types/finance';

interface Props {
  data: Transaction[];
}

export default function FinanceChart({ data }: Props) {
  // Group data by day for the chart
  const chartData = data.reduce((acc: any[], curr) => {
    const date = new Date(curr.date).getDate();
    const existing = acc.find(item => item.day === date);
    if (existing) {
      if (curr.type === 'income') existing.income += curr.amount;
      else existing.expense += curr.amount;
    } else {
      acc.push({
        day: date,
        income: curr.type === 'income' ? curr.amount : 0,
        expense: curr.type === 'expense' ? curr.amount : 0,
      });
    }
    return acc;
  }, []).sort((a, b) => a.day - b.day);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm mb-6">
      <h3 className="text-slate-800 dark:text-white font-semibold mb-4">Analytics</h3>
      <div className="h-[200px] w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="income" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
            <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
