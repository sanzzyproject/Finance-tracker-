'use client';
import { useState } from 'react';
import { Transaction, TransactionType } from '@/types/finance';
import { X, ChevronDown, Check } from 'lucide-react';

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
    <div className="absolute inset-0 z-50 flex flex-col bg-[#0B0F19] animate-in slide-in-from-bottom-20 duration-300">
      {/* Header */}
      <div className="px-6 py-6 flex justify-between items-center border-b border-slate-800">
        <h2 className="text-lg font-bold text-white">Transaksi Baru</h2>
        <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 pt-6 flex flex-col">
        {/* Toggle Type */}
        <div className="grid grid-cols-2 gap-4 mb-8 bg-[#151A2D] p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              type === 'expense' ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'text-slate-500'
            }`}
          >
            Pengeluaran
            {type === 'expense' && <Check size={14} />}
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              type === 'income' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/50' : 'text-slate-500'
            }`}
          >
            Pemasukan
            {type === 'income' && <Check size={14} />}
          </button>
        </div>

        {/* Input Amount */}
        <div className="mb-8">
          <label className="text-xs text-slate-500 font-bold mb-2 block tracking-wider">NOMINAL (RP)</label>
          <input 
            type="number" 
            required
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-4xl font-bold text-white placeholder-slate-700 outline-none border-b-2 border-slate-800 focus:border-blue-500 pb-2 transition-colors"
            placeholder="0"
          />
        </div>

        {/* Inputs Lain */}
        <div className="space-y-4 mb-auto">
          <div className="relative">
            <label className="text-xs text-slate-500 font-bold mb-2 block tracking-wider">KATEGORI</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#151A2D] text-white rounded-xl p-4 outline-none appearance-none font-medium text-sm border border-slate-800 focus:border-slate-600 transition-colors"
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
            <ChevronDown className="absolute right-4 bottom-4 text-slate-400 pointer-events-none" size={18} />
          </div>

          <div>
             <label className="text-xs text-slate-500 font-bold mb-2 block tracking-wider">CATATAN</label>
             <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#151A2D] text-white rounded-xl p-4 outline-none font-medium text-sm border border-slate-800 focus:border-slate-600 transition-colors placeholder-slate-600"
              placeholder="Keterangan transaksi..."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pb-8 pt-4">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/50 active:scale-[0.98] transition-all">
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  );
}
