import Image from 'next/image';

export default function Header() {
  const today = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="flex justify-between items-center px-6 pt-8 pb-4 bg-white">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hai, Alex! 👋</h1>
        <p className="text-slate-400 text-sm">{today}</p>
      </div>
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-100">
        <Image 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150" 
          alt="Profile" 
          width={48} 
          height={48} 
        />
      </div>
    </div>
  );
}
