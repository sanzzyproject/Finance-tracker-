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
    <main className="flex flex-col h-full relative bg-background">
      
      {/* 1. BAGIAN ATAS (FIXED / NON-SCROLL) */}
      {/* Hanya muncul di tab Home */}
      {activeTab === 'home' && (
        <div className="shrink-0 z-10 bg-background border-b border-border/0 pb-2">
          <Header />
          <BudgetCard expense={stats.expense} limit={5000000} />
          
          {/* Judul List Transaksi (Sticky effect visual) */}
          <div className="px-6 mt-4 flex justify-between items-end">
             <h3 className="font-semibold text-white text-base">Recent Transactions</h3>
             <button className="text-[10px] text-primary hover:underline">View All</button>
          </div>
        </div>
      )}

      {/* 2. BAGIAN BAWAH (SCROLLABLE AREA) */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative">
        {activeTab === 'home' && (
          <ActivityList 
            transactions={transactions} 
            onDelete={handleDelete} 
          />
        )}

        {activeTab === 'stats' && (
          <div className="h-full overflow-y-auto pb-24">
             {/* Header khusus stats jika perlu, atau gunakan Header umum */}
             <div className="pt-8"><Header /></div>
             <SpendingAnalysis transactions={transactions} />
          </div>
        )}
      </div>

      {/* 3. NAVIGATION (FIXED) */}
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
