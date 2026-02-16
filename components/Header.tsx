import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6 pt-4">
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Good Morning,</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Angela 👋</h1>
      </div>
      <DarkModeToggle />
    </div>
  );
}
