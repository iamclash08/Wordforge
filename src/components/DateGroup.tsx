import type { DateGroup as DateGroupType, WordEntry } from "../types";
import WordCard from "./WordCard";

interface DateGroupProps {
  group: DateGroupType;
  onDelete: (id: string) => void;
  onEdit: (entry: WordEntry) => void;
}

export default function DateGroup({ group, onDelete, onEdit }: DateGroupProps) {
  return (
    <div className="mt-7">
      <div className="mb-3.5 flex items-center gap-3">
        <h2 className="whitespace-nowrap font-body text-sm font-bold uppercase tracking-widest text-forge-dark">
          {group.label}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-forge-muted to-transparent" />
        <span className="whitespace-nowrap rounded-full bg-forge-cream px-2.5 py-0.5 text-xs font-semibold text-slate-400">
          {group.items.length} {group.items.length === 1 ? "word" : "words"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((entry) => (
          <WordCard
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}