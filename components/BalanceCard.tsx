import { formatCurrency } from '@/lib/utils';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';

interface Props {
  income: number;
  expense: number;
  total: number;
}

export default function BalanceCard({ income, expense, total }: Props) {
  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-3xl p-6 shadow-xl shadow-blue-500/20 mb-6 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <p className="text-blue-100 text-sm mb-1 font-medium">Total Balance</p>
        <h2 className="text-3xl font-bold mb-6">{formatCurrency(total)}</h2>

        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl w-full backdrop-blur-sm">
            <div className="bg-white/20 p-1.5 rounded-full"><ArrowDownCircle size={18} /></div>
            <div>
              <p className="text-xs text-blue-100">Income</p>
              <p className="text-sm font-semibold">{formatCurrency(income)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-xl w-full backdrop-blur-sm">
            <div className="bg-white/20 p-1.5 rounded-full"><ArrowUpCircle size={18} /></div>
            <div>
              <p className="text-xs text-blue-100">Expense</p>
              <p className="text-sm font-semibold">{formatCurrency(expense)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
