'use client';
import { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import BudgetCard from '@/components/BudgetCard';
import ActivityList from '@/components/ActivityList';
import SpendingAnalysis from '@/components/SpendingAnalysis';
import AddTransactionModal from '@/components/AddTransactionModal';
import BottomNav from '@/components/BottomNav';
import { Transaction } from '@/types/finance';
import { addTransaction, getTransactions, deleteTransaction } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); 

  const loadData = async () => {
    const data = await getTransactions();
    setTransactions(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  useEffect(() => {
    loadData();
  }, []);

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
    <main className="flex-1 overflow-y-auto no-scrollbar relative h-full bg-[#0B0F19]">
      
      {activeTab === 'home' && (
        <div className="animate-in fade-in duration-300 pb-24">
          <Header />
          
          <div className="px-6 mb-4">
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">Total Saldo</p>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{formatCurrency(stats.total)}</h1>
          </div>

          <BudgetCard expense={stats.expense} limit={5000000} />

          <ActivityList 
            transactions={transactions} 
            onDelete={handleDelete} 
          />
        </div>
      )}

      {activeTab === 'stats' && (
        <SpendingAnalysis transactions={transactions} />
      )}

      {/* Credit Footer */}
      <div className="w-full text-center py-4 text-[10px] text-slate-600 absolute bottom-0 left-0 right-0 pointer-events-none z-0">
        Engineered by <span className="font-bold text-slate-500">SANN404 FORUM</span>
      </div>

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
