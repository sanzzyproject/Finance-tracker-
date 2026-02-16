import Image from 'next/image';
import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 pt-8 pb-4 bg-[#0B0F19]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 p-0.5">
          <Image 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150" 
            alt="Profile" 
            width={40} 
            height={40}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="text-slate-400 text-xs font-medium">Selamat Datang,</p>
          <h1 className="text-lg font-bold text-white leading-tight">Alex Sander</h1>
        </div>
      </div>
      
      <button className="p-2.5 bg-[#151A2D] rounded-full text-white border border-slate-800 hover:bg-slate-800 transition relative">
        <Bell size={18} />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#151A2D]"></span>
      </button>
    </div>
  );
}
