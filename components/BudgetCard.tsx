import { formatCurrency } from '@/lib/utils';
import { Wallet } from 'lucide-react';

interface Props {
  expense: number;
  limit?: number;
}

export default function BudgetCard({ expense, limit = 5000000 }: Props) {
  const percentage = Math.min(Math.round((expense / limit) * 100), 100);

  return (
    <div className="px-6 mb-8">
      {/* Neon Gradient Border Effect */}
      <div className="relative p-[1px] rounded-[32px] bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="bg-[#101423] rounded-[31px] p-6 relative overflow-hidden">
          
          {/* Background Abstract Glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 bottom-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl"></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-slate-400 text-xs font-medium tracking-wider mb-1">TOTAL PENGELUARAN</p>
              <h2 className="text-3xl font-bold text-white tracking-tight">{formatCurrency(expense)}</h2>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm border border-slate-700/50">
               <Wallet className="text-blue-400" size={20} />
            </div>
          </div>

          {/* Modern Progress Bar */}
          <div className="relative z-10">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-400">Limit: {formatCurrency(limit)}</span>
              <span className="text-blue-400 font-bold">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
