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
    // Container Utama: Full Height & Flex Column agar tidak ada scroll di body utama
    <main className="flex flex-col h-full w-full bg-background relative overflow-hidden">
      
      {/* --- AREA 1: BAGIAN ATAS (FIXED) --- */}
      {/* Area ini TIDAK AKAN SCROLL */}
      {activeTab === 'home' && (
        <div className="shrink-0 z-20 bg-background w-full">
          <Header />
          <BudgetCard expense={stats.expense} limit={5000000} />
          
          {/* Judul List (Sticky effect visual) */}
          <div className="px-6 mt-2 pb-2 flex justify-between items-end border-b border-border/50">
             <h3 className="font-semibold text-white text-base">Riwayat Transaksi</h3>
             <button className="text-[10px] text-primary hover:underline">Lihat Semua</button>
          </div>
        </div>
      )}

      {/* --- AREA 2: BAGIAN TENGAH (SCROLLABLE) --- */}
      {/* Area ini MENGISI SISA RUANG (flex-1) dan BISA SCROLL (overflow-y-auto) */}
      <div className="flex-1 overflow-y-auto no-scrollbar w-full pb-32">
        
        {activeTab === 'home' && (
          <ActivityList 
            transactions={transactions} 
            onDelete={handleDelete} 
          />
        )}

        {activeTab === 'stats' && (
          <div className="pt-8">
             {/* Header khusus stats jika perlu */}
             <div className="px-6 mb-4"><h2 className="text-xl font-bold text-white">Analisis</h2></div>
             <SpendingAnalysis transactions={transactions} />
          </div>
        )}
      </div>

      {/* --- AREA 3: BAGIAN BAWAH (FLOATING FIXED) --- */}
      {/* Navigasi mengambang di atas konten */}
      <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none">
         {/* Pointer events auto pada child agar tombol bisa diklik tapi area kosong tembus */}
         <div className="pointer-events-auto">
            <BottomNav 
              currentTab={activeTab} 
              onTabChange={setActiveTab} 
              onAddClick={() => setIsModalOpen(true)} 
            />
         </div>
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAdd} 
      />
    </main>
  );
}
