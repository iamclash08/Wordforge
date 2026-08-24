import { useState } from "react";
import type { WordEntry } from "../types";

interface WordCardProps {
  entry: WordEntry;
  onDelete: (id: string) => void;
  onEdit: (entry: WordEntry) => void;
}

export default function WordCard({ entry, onDelete, onEdit }: WordCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onEdit(entry)}
      className={`relative cursor-pointer rounded-xl border border-forge-border border-l-[3px] border-l-forge-amber bg-forge-card p-5 transition-all duration-200 ${
        hovered
          ? "-translate-y-0.5 shadow-lg shadow-slate-900/[0.08]"
          : "shadow-sm shadow-slate-900/[0.04]"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(entry.id);
        }}
        title="Delete word"
        className={`absolute right-3 top-3 p-1 text-slate-300 transition-opacity hover:text-red-400 cursor-pointer ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h14M8 6V4a1 1 0 011-1h2a1 1 0 011 1v2m2 0v10a2 2 0 01-2 2H8a2 2 0 01-2-2V6h10z" />
        </svg>
      </button>

      <h3 className="font-display text-[19px] font-bold capitalize tracking-tight text-forge-dark">
        {entry.word}
      </h3>

      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
        {entry.meaning}
      </p>

      {entry.example && (
        <p className="mt-2.5 border-t border-forge-warm pt-2.5 text-[13px] italic leading-snug text-slate-400">
          &ldquo;{entry.example}&rdquo;
        </p>
      )}
    </div>
  );
}