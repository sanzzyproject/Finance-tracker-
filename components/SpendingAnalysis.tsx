'use client';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell, YAxis } from 'recharts';
import { Transaction } from '@/types/finance';
import { formatCurrency } from '@/lib/utils';
import { Coffee, ShoppingBag, Home, Zap, Wallet, ArrowUpCircle } from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

export default function SpendingAnalysis({ transactions }: Props) {
  const [range, setRange] = useState<'week' | 'month' | 'year'>('week');

  // 1. Filter Data Berdasarkan Range (Minggu/Bulan/Tahun)
  const filteredData = useMemo(() => {
    const now = new Date();
    return transactions.filter(t => {
      const tDate = new Date(t.date);
      if (range === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return tDate >= oneWeekAgo;
      } else if (range === 'month') {
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      } else {
        return tDate.getFullYear() === now.getFullYear();
      }
    });
  }, [transactions, range]);

  // 2. Siapkan Data untuk Grafik (Income & Expense Gabung tapi Beda Warna)
  const chartData = useMemo(() => {
    const grouped: any = {};
    
    filteredData.forEach(t => {
      // Format Label Sumbu X
      let key = '';
      const date = new Date(t.date);
      if (range === 'week') key = date.toLocaleDateString('id-ID', { weekday: 'short' }); // Sen, Sel
      else if (range === 'month') key = date.getDate().toString(); // 1, 2, 3
      else key = date.toLocaleDateString('id-ID', { month: 'short' }); // Jan, Feb

      if (!grouped[key]) grouped[key] = { name: key, income: 0, expense: 0, order: date.getTime() };
      
      if (t.type === 'income') grouped[key].income += t.amount;
      else grouped[key].expense += t.amount;
    });

    return Object.values(grouped).sort((a: any, b: any) => a.order - b.order);
  }, [filteredData, range]);

  // 3. Hitung Top Kategori (Hanya Pengeluaran)
  const categoryStats = useMemo(() => {
    const expenses = filteredData.filter(t => t.type === 'expense');
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
    const grouped: any = {};

    expenses.forEach(t => {
      if (!grouped[t.category]) grouped[t.category] = 0;
      grouped[t.category] += t.amount;
    });

    return Object.keys(grouped)
      .map(cat => ({
        name: cat,
        amount: grouped[cat],
        percent: totalExpense === 0 ? 0 : Math.round((grouped[cat] / totalExpense) * 100)
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 4); // Ambil Top 4
  }, [filteredData]);

  // Helper Icon
  const getIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'makanan': return <Coffee size={18} />;
      case 'belanja': return <ShoppingBag size={18} />;
      case 'sewa': return <Home size={18} />;
      case 'tagihan': return <Zap size={18} />;
      default: return <Wallet size={18} />;
    }
  };

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 mb-6 pt-4">
        <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Analisis Pengeluaran</h2>
        
        {/* TAB SWITCHER (Week/Month/Year) */}
        <div className="bg-slate-100 p-1 rounded-full flex justify-between">
          {(['week', 'month', 'year'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
                range === r ? 'bg-[#0d9488] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r === 'week' ? 'Minggu' : r === 'month' ? 'Bulan' : 'Tahun'}
            </button>
          ))}
        </div>
      </div>

      {/* GRAFIK (Combined Income/Expense) */}
      <div className="h-[220px] w-full px-4 mb-8">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={4}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              {/* Income Bar (Hijau Muda/Abu) */}
              <Bar dataKey="income" fill="#cbd5e1" radius={[4, 4, 4, 4]} barSize={12} stackId="a" />
              {/* Expense Bar (Teal Utama) */}
              <Bar dataKey="expense" fill="#0d9488" radius={[4, 4, 4, 4]} barSize={12} stackId="b" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs border-2 border-dashed border-slate-100 rounded-xl mx-6">
            Belum ada data periode ini
          </div>
        )}
        <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#0d9488]"></div><span className="text-[10px] text-slate-400">Pengeluaran</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#cbd5e1]"></div><span className="text-[10px] text-slate-400">Pemasukan</span></div>
        </div>
      </div>

      {/* TOP CATEGORIES LIST */}
      <div className="px-6">
        <h3 className="font-bold text-slate-900 mb-4 text-sm">Kategori Teratas</h3>
        <div className="space-y-4">
          {categoryStats.length > 0 ? categoryStats.map((cat, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                  {getIcon(cat.name)}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{cat.name}</p>
                  <p className="text-slate-400 text-[10px]">{cat.percent}% dari total</p>
                </div>
              </div>
              
              {/* Donut Chart Mini (CSS Conic Gradient) */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <div 
                    className="absolute inset-0 rounded-full"
                    style={{ 
                        background: `conic-gradient(#0d9488 ${cat.percent}%, #e2e8f0 0)` 
                    }}
                 ></div>
                 <div className="absolute inset-1 bg-white rounded-full"></div>
              </div>
            </div>
          )) : (
            <p className="text-center text-slate-400 text-xs py-4">Belum ada pengeluaran</p>
          )}
        </div>
      </div>
    </div>
  );
}
