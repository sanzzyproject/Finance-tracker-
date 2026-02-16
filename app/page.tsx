'use client';
import { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import BudgetCard from '@/components/BudgetCard';
import FinanceChart from '@/components/FinanceChart';
import ActivityList from '@/components/ActivityList';
import AddTransactionModal from '@/components/AddTransactionModal';
import BottomNav from '@/components/BottomNav';
import { Transaction } from '@/types/finance';
import { addTransaction, getTransactions, deleteTransaction } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'stats'

  const loadData = async () => {
    const data = await getTransactions();
    setTransactions(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Hitung total saldo
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, total: income - expense };
  }, [transactions]);

  const handleAdd = async (tx: Transaction) => {
    await addTransaction(tx);
    await loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Hapus transaksi ini?')) {
      await deleteTransaction(id);
      await loadData();
    }
  };

  return (
    <main className="flex-1 overflow-y-auto no-scrollbar bg-white relative">
      
      {/* --- HALAMAN UTAMA (HOME) --- */}
      {activeTab === 'home' && (
        <>
          <Header />
          
          <div className="px-6 mb-4">
            <p className="text-slate-500 text-sm font-medium">Saldo Saat Ini</p>
            <h1 className="text-4xl font-extrabold text-slate-900 mt-1">{formatCurrency(stats.total)}</h1>
          </div>

          <BudgetCard expense={stats.expense} limit={5000000} /> {/* Set budget manual 5jt */}

          <ActivityList 
            transactions={transactions} 
            onDelete={handleDelete} 
          />
        </>
      )}

      {/* --- HALAMAN STATISTIK --- */}
      {activeTab === 'stats' && (
        <div className="pt-8 animate-in fade-in duration-300">
          <h2 className="text-2xl font-bold px-6 mb-6 text-slate-900">Analisis Keuangan</h2>
          <FinanceChart data={transactions} />
          
          {/* Ringkasan Teks */}
          <div className="px-6 grid grid-cols-2 gap-4">
             <div className="bg-emerald-50 p-4 rounded-2xl">
               <p className="text-emerald-600 text-xs font-bold uppercase">Total Pemasukan</p>
               <p className="text-emerald-700 font-bold text-lg mt-1">{formatCurrency(stats.income)}</p>
             </div>
             <div className="bg-red-50 p-4 rounded-2xl">
               <p className="text-red-500 text-xs font-bold uppercase">Total Pengeluaran</p>
               <p className="text-red-600 font-bold text-lg mt-1">{formatCurrency(stats.expense)}</p>
             </div>
          </div>
        </div>
      )}

      {/* Footer Credit */}
      <div className="w-full text-center py-6 text-[10px] text-slate-300 pb-28">
        Developed by <span className="font-bold">SANN404 FORUM</span>
      </div>

      {/* NAVIGATION BAR */}
      <BottomNav 
        currentTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddClick={() => setIsModalOpen(true)} 
      />

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAdd} 
      />
    </main>
  );
}
