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
    <div className="absolute inset-0 bg-black/60 z-50 flex items-end backdrop-blur-[2px]">
      <div className="bg-white w-full rounded-t-[30px] p-6 animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Tambah Transaksi</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800">
            Batal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Toggle Type */}
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                type === 'expense' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              }`}
            >
              Pengeluaran
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                type === 'income' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              }`}
            >
              Pemasukan
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">JUMLAH (RP)</label>
            <input 
              type="number" 
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-4xl font-bold text-slate-800 placeholder-slate-200 outline-none border-b border-slate-100 pb-2 focus:border-[#0d9488] transition-colors"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">KATEGORI</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 rounded-xl p-4 outline-none appearance-none font-medium"
              >
                <option>Makanan</option>
                <option>Sewa</option>
                <option>Belanja</option>
                <option>Transport</option>
                <option>Tagihan</option>
                <option>Gaji</option>
                <option>Investasi</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 text-slate-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">CATATAN (OPSIONAL)</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 rounded-xl p-4 outline-none font-medium"
              placeholder="Contoh: Makan siang"
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-4 hover:bg-slate-800 active:scale-[0.98] transition-all">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
