import { Home, BarChart2, Plus, User } from 'lucide-react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export default function BottomNav({ currentTab, onTabChange, onAddClick }: Props) {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-6 z-40 flex justify-center">
      <div className="bg-[#151A2D]/90 backdrop-blur-md border border-slate-700 rounded-full px-6 py-3 shadow-2xl flex items-center gap-8">
        
        <button 
          onClick={() => onTabChange('home')}
          className={`p-2 rounded-full transition-all ${currentTab === 'home' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Home size={22} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
        </button>

        {/* Floating Add Button */}
        <button 
          onClick={onAddClick}
          className="bg-blue-500 text-white p-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-400 hover:scale-110 transition-all -mt-8 border-4 border-[#0B0F19]"
        >
          <Plus size={24} strokeWidth={3} />
        </button>

        <button 
          onClick={() => onTabChange('stats')}
          className={`p-2 rounded-full transition-all ${currentTab === 'stats' ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <BarChart2 size={22} strokeWidth={currentTab === 'stats' ? 2.5 : 2} />
        </button>
      </div>
    </div>
  );
}

