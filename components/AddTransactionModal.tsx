'use client';
import { useState } from 'react';
import { Transaction, TransactionType } from '@/types/finance';
import { X, ChevronDown } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Transaction) => void;
}

export default function AddTransactionModal({ isOpen, onClose, onSave }: Props) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Makanan');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      amount: Number(amount),
      type,
      category,
      description,
      date: new Date().toISOString(),
    });
    setAmount('');
    setDescription('');
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-bottom-10 duration-300">
      {/* Header Modal */}
      <div className="px-6 py-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Tambah Transaksi</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-800 font-medium text-sm">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 flex flex-col">
        {/* Toggle Type (Segmented Control) */}
        <div className="bg-slate-100 p-1 rounded-full flex mb-8">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
              type === 'expense' ? 'bg-[#0d9488] text-white shadow-md' : 'text-slate-500'
            }`}
          >
            Pengeluaran
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${
              type === 'income' ? 'bg-[#0d9488] text-white shadow-md' : 'text-slate-500'
            }`}
          >
            Pemasukan
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 mb-2">AMOUNT</label>
          <div className="relative">
            <input 
              type="number" 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold text-slate-900 placeholder-slate-200 outline-none border-b border-slate-100 pb-3 bg-transparent focus:border-[#0d9488] transition-colors"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Category Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 mb-2">CATEGORY</label>
          <div className="relative">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 rounded-2xl p-4 outline-none appearance-none font-bold text-sm border border-slate-100"
            >
              <option>Makanan</option>
              <option>Sewa</option>
              <option>Belanja</option>
              <option>Transport</option>
              <option>Tagihan</option>
              <option>Gaji</option>
              <option>Investasi</option>
              <option>Lainnya</option>
            </select>
            <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Description Input */}
        <div className="mb-auto">
          <label className="block text-xs font-semibold text-slate-400 mb-2">DESCRIPTION (OPTIONAL)</label>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-50 text-slate-800 rounded-2xl p-4 outline-none font-medium text-sm border border-slate-100 placeholder-slate-300"
            placeholder="Contoh: Belanja Bulanan"
          />
        </div>

        {/* Save Button */}
        <div className="pb-8 pt-4">
          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
