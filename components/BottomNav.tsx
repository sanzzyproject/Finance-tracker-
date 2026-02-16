import { Home, BarChart2, Plus } from 'lucide-react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export default function BottomNav({ currentTab, onTabChange, onAddClick }: Props) {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-10 z-40 flex justify-center">
      <div className="bg-[#18181B] border border-border rounded-full px-6 py-2.5 shadow-2xl flex items-center gap-12">
        
        <button 
          onClick={() => onTabChange('home')}
          className={`transition-all p-2 ${currentTab === 'home' ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          <Home size={22} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
        </button>

        {/* Add Button - Menembus batas atas nav */}
        <button 
          onClick={onAddClick}
          className="bg-primary text-black p-3.5 rounded-full hover:scale-105 transition-all -mt-10 border-[5px] border-background shadow-lg shadow-black/50"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        <button 
          onClick={() => onTabChange('stats')}
          className={`transition-all p-2 ${currentTab === 'stats' ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          <BarChart2 size={22} strokeWidth={currentTab === 'stats' ? 2.5 : 2} />
        </button>
      </div>
    </div>
  );
}
