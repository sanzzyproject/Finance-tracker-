import { Home, BarChart3, Plus, User } from 'lucide-react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export default function BottomNav({ currentTab, onTabChange, onAddClick }: Props) {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 pb-6 pt-2 px-8 flex justify-between items-center z-40">
      
      {/* Home Tab */}
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 ${currentTab === 'home' ? 'text-[#0d9488]' : 'text-slate-300'}`}
      >
        <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
      </button>

      {/* Floating Add Button (Center) */}
      <button 
        onClick={onAddClick}
        className="bg-[#10b981] text-white p-4 rounded-full shadow-lg shadow-emerald-400/40 -mt-8 border-4 border-white hover:scale-105 transition-transform"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      {/* Stats/Chart Tab */}
      <button 
        onClick={() => onTabChange('stats')}
        className={`flex flex-col items-center gap-1 ${currentTab === 'stats' ? 'text-[#0d9488]' : 'text-slate-300'}`}
      >
        <BarChart3 size={24} strokeWidth={currentTab === 'stats' ? 2.5 : 2} />
      </button>
    </div>
  );
}
