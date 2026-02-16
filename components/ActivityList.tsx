import { Transaction } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag, Home, Zap, Coffee, Wallet, Trash2 } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'makanan': return <Coffee size={20} />;
    case 'belanja': return <ShoppingBag size={20} />;
    case 'sewa': return <Home size={20} />;
    case 'tagihan': return <Zap size={20} />;
    default: return <Wallet size={20} />;
  }
};

export default function ActivityList({ transactions, onDelete }: Props) {
  return (
    <div className="px-6">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Transaksi Terbaru</h3>
      <div className="space-y-4 pb-32"> {/* Padding bottom extra agar tidak ketutup navbar */}
        {transactions.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-4">Belum ada transaksi.</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
                  {getIcon(t.category)}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">{t.category}</p>
                  <p className="text-slate-400 text-xs">{formatDate(t.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
                <button 
                  onClick={() => t.id && onDelete(t.id)}
                  className="text-slate-300 hover:text-red-500 text-xs mt-1 transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
