import { Home, BarChart2, Plus, Target } from 'lucide-react'; // Import Target

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onAddClick: () => void;
}

export default function BottomNav({ currentTab, onTabChange, onAddClick }: Props) {
  const isActive = (tab: string) => currentTab === tab ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400';
  
  return (
    <div className="absolute bottom-6 left-0 right-0 px-10 z-40 flex justify-center pointer-events-none">
      {/* Container Navigasi */}
      <div className="bg-[#18181B] border border-border rounded-[28px] px-6 py-2.5 shadow-2xl shadow-black/50 flex items-center gap-8 pointer-events-auto backdrop-blur-md">
        
        {/* Tab Home */}
        <button onClick={() => onTabChange('home')} className={`transition-all p-2.5 rounded-full group ${isActive('home')}`}>
          <Home size={24} strokeWidth={currentTab === 'home' ? 2.5 : 2} className="group-hover:scale-110 transition-transform"/>
        </button>

        {/* TAB BARU: Wishlist (Target) */}
        <button onClick={() => onTabChange('wishlist')} className={`transition-all p-2.5 rounded-full group ${isActive('wishlist')}`}>
          <Target size={24} strokeWidth={currentTab === 'wishlist' ? 2.5 : 2} className="group-hover:scale-110 transition-transform"/>
        </button>

        {/* Tombol Tambah (Tengah) */}
        <button 
          onClick={onAddClick}
          className="bg-primary text-black p-4 rounded-[20px] hover:scale-105 hover:-translate-y-1 transition-all -mt-10 border-[6px] border-background shadow-[0_10px_20px_-5px_#D9F15480] group relative overflow-hidden"
        >
          <Plus size={26} strokeWidth={3} className="relative z-10" />
          {/* Efek kilau saat di-hover */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
        
        {/* Tab Stats */}
        <button onClick={() => onTabChange('stats')} className={`transition-all p-2.5 rounded-full group ${isActive('stats')}`}>
          <BarChart2 size={24} strokeWidth={currentTab === 'stats' ? 2.5 : 2} className="group-hover:scale-110 transition-transform"/>
        </button>
      </div>
    </div>
  );
}
