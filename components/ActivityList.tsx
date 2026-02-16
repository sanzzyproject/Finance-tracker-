import { Transaction } from '@/types/finance';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, Trash2 } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export default function ActivityList({ transactions, onDelete }: Props) {
  return (
    <div className="mb-24">
      <h3 className="text-slate-800 dark:text-white font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-4">No transactions found.</p>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {t.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-medium text-sm">{t.category}</p>
                  <p className="text-slate-400 text-xs">{formatDate(t.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </p>
                <button 
                  onClick={() => t.id && onDelete(t.id)}
                  className="text-red-400 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
