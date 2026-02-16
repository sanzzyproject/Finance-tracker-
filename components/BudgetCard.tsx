import { formatCurrency } from '@/lib/utils';

interface Props {
  expense: number;
  limit?: number;
}

export default function BudgetCard({ expense, limit = 5000000 }: Props) {
  const percentage = Math.min(Math.round((expense / limit) * 100), 100);

  return (
    <div className="px-6 mb-6">
      <div className="bg-[#0d9488] rounded-3xl p-6 text-white shadow-xl shadow-teal-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <h3 className="text-teal-50 font-medium mb-1 text-sm">Anggaran Bulanan</h3>
        
        <div className="w-full bg-teal-900/30 h-2 rounded-full mt-4 mb-2 overflow-hidden">
          <div 
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-end">
          <p className="text-xs text-teal-100 opacity-90 font-medium">
            {formatCurrency(expense)} / {formatCurrency(limit)}
          </p>
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
