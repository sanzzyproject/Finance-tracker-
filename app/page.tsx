'use client';
import { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import BalanceCard from '@/components/BalanceCard';
import FilterBar from '@/components/FilterBar';
import FinanceChart from '@/components/FinanceChart';
import ActivityList from '@/components/ActivityList';
import AddTransactionModal from '@/components/AddTransactionModal';
import { Plus } from 'lucide-react';
import { Transaction } from '@/types/finance';
import { addTransaction, getTransactions, deleteTransaction } from '@/lib/db';
import { exportToCSV } from '@/lib/exportCSV';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Load Data
  const loadData = async () => {
    const data = await getTransactions();
    // Sort desc by date
    setTransactions(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
  }, [transactions, month, year]);

  // Calculate Balance
  const stats = useMemo(() => {
    const income = filteredData.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = filteredData.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, total: income - expense };
  }, [filteredData]);

  const handleAdd = async (tx: Transaction) => {
    await addTransaction(tx);
    await loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this transaction?')) {
      await deleteTransaction(id);
      await loadData();
    }
  };

  return (
    <main className="px-6 pb-6 min-h-screen relative">
      <Header />
      
      <BalanceCard 
        income={stats.income} 
        expense={stats.expense} 
        total={stats.total} 
      />

      <FilterBar 
        month={month} 
        year={year} 
        onFilterChange={(m, y) => { setMonth(m); setYear(y); }}
        onExport={() => exportToCSV(filteredData)}
      />

      <FinanceChart data={filteredData} />
      
      <ActivityList 
        transactions={filteredData} 
        onDelete={handleDelete} 
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 hover:scale-110 transition-transform active:scale-90 max-w-[420px] mx-auto z-40"
        style={{ left: '50%', marginLeft: '130px' }} // Positioning hack for max-width layout
      >
        <Plus size={28} />
      </button>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAdd} 
      />
    </main>
  );
}
