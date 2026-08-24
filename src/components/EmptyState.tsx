interface EmptyStateProps {
  isSearching: boolean;
  onAddClick: () => void;
}

export default function EmptyState({
  isSearching,
  onAddClick,
}: EmptyStateProps) {
  return (
    <div className="py-20 text-center text-slate-400">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto opacity-50"
      >
        <rect x="12" y="8" width="40" height="48" rx="4" />
        <line x1="22" y1="20" x2="42" y2="20" />
        <line x1="22" y1="28" x2="38" y2="28" />
        <line x1="22" y1="36" x2="34" y2="36" />
      </svg>

      <p className="mt-4 text-[17px] font-semibold text-slate-500">
        {isSearching ? "No words match your search" : "Your forge is empty"}
      </p>
      <p className="mt-1 text-sm">
        {isSearching
          ? "Try a different search term"
          : "Start building your vocabulary — add your first word"}
      </p>

      {!isSearching && (
        <button
          onClick={onAddClick}
          className="mt-5 rounded-[10px] bg-forge-amber px-[22px] py-2.5 text-sm font-bold text-forge-dark transition-colors hover:bg-forge-amber-light cursor-pointer"
        >
          Add Your First Word
        </button>
      )}
    </div>
  );
}