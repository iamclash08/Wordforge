import { forwardRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="9" cy="9" r="6" />
            <line x1="14" y1="14" x2="18" y2="18" />
          </svg>
        </span>

        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search words, meanings, examples..."
          className="w-full rounded-xl border-[1.5px] border-forge-muted bg-white py-3 pl-[42px] pr-14 text-[15px] text-forge-dark outline-none transition-all"
        />

        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-forge-warm px-2 py-0.5 text-[11px] font-medium text-slate-300">
          ⌘K
        </span>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;