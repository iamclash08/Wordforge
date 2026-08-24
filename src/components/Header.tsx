interface HeaderProps {
  totalWords: number;
  todayCount: number;
  onAddClick: () => void;
}

export default function Header({
  totalWords,
  todayCount,
  onAddClick,
}: HeaderProps) {
  return (
    <header className="bg-forge-dark sticky top-0 z-40 border-b-[3px] border-forge-amber px-6">
      <div className="mx-auto flex h-16 max-w-[900px] items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <span className="font-display text-[22px] font-extrabold tracking-tight text-slate-50">
            WordForge
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="text-right text-[13px] leading-tight text-slate-400">
            <span className="text-forge-amber text-base font-bold">
              {totalWords}
            </span>
            <span className="ml-1">words</span>
            {todayCount > 0 && (
              <span className="ml-2 text-slate-500">+{todayCount} today</span>
            )}
          </div>

          <button
            onClick={onAddClick}
            className="flex items-center gap-1.5 rounded-[10px] bg-forge-amber px-[18px] py-[9px] text-sm font-bold text-forge-dark transition-colors hover:bg-forge-amber-light cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="10" y1="4" x2="10" y2="16" />
              <line x1="4" y1="10" x2="16" y2="10" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </header>
  );
}