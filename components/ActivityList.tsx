import { Transaction } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag, Home, Zap, Coffee, Wallet, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'makanan': return <Coffee size={18} className="text-yellow-400" />;
    case 'belanja': return <ShoppingBag size={18} className="text-purple-400" />;
    case 'sewa': return <Home size={18} className="text-blue-400" />;
    case 'tagihan': return <Zap size={18} className="text-cyan-400" />;
    default: return <Wallet size={18} className="text-slate-400" />;
  }
};

export default function ActivityList({ transactions, onDelete }: Props) {
  return (
    <div className="px-6 mb-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-white">Transaksi Terbaru</h3>
        <button className="text-xs text-blue-400">Lihat Semua</button>
      </div>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-slate-600 text-sm py-4">Belum ada transaksi.</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="bg-[#151A2D] p-4 rounded-2xl border border-slate-800/50 flex items-center justify-between group hover:border-slate-700 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#0B0F19] border border-slate-800 shadow-inner">
                  {getIcon(t.category)}
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-0.5">{t.category}</p>
                  <p className="text-slate-500 text-[10px]">{formatDate(t.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
                <div className="flex justify-end mt-1">
                   {t.type === 'income' ? <ArrowDownLeft size={12} className="text-emerald-400/50" /> : <ArrowUpRight size={12} className="text-red-400/50" />}
                   <button 
                    onClick={() => t.id && onDelete(t.id)}
                    className="text-slate-600 hover:text-red-500 text-[10px] ml-2"
                   >
                    Hapus
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
