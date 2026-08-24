import { useState, useEffect, useRef } from "react";
import type { WordEntry } from "../types";

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Pick<WordEntry, "word" | "meaning" | "example">) => void;
  editWord: WordEntry | null;
}

export default function AddWordModal({
  isOpen,
  onClose,
  onAdd,
  editWord,
}: AddWordModalProps) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (editWord) {
        setWord(editWord.word);
        setMeaning(editWord.meaning);
        setExample(editWord.example || "");
      } else {
        setWord("");
        setMeaning("");
        setExample("");
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, editWord]);

  const canSubmit = word.trim() && meaning.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    onAdd({
      word: word.trim(),
      meaning: meaning.trim(),
      example: example.trim(),
    });
    setWord("");
    setMeaning("");
    setExample("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
    if (e.key === "Escape") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-forge-dark/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="animate-modal-in w-[min(440px,92vw)] rounded-2xl bg-[#fffcf7] p-8 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-forge-dark">
            {editWord ? "Edit Word" : "New Word"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 transition-colors hover:text-slate-600 cursor-pointer"
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
              <line x1="5" y1="5" x2="15" y2="15" />
              <line x1="15" y1="5" x2="5" y2="15" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
              Word
            </label>
            <input
              ref={inputRef}
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g. Ephemeral"
              className="w-full rounded-[10px] border-[1.5px] border-forge-muted bg-white px-3.5 py-2.5 text-[15px] text-forge-dark outline-none transition-all"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
              Meaning
            </label>
            <textarea
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="Lasting for a very short time"
              rows={2}
              className="w-full resize-y rounded-[10px] border-[1.5px] border-forge-muted bg-white px-3.5 py-2.5 text-[15px] text-forge-dark outline-none transition-all min-h-[60px]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
              Example Sentence{" "}
              <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder={`"The ephemeral beauty of cherry blossoms makes them special."`}
              rows={2}
              className="w-full resize-y rounded-[10px] border-[1.5px] border-forge-muted bg-white px-3.5 py-2.5 text-[15px] text-forge-dark outline-none transition-all min-h-[60px]"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-[10px] border-[1.5px] border-forge-muted bg-transparent px-[22px] py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-[10px] bg-forge-amber px-[22px] py-2.5 text-sm font-bold text-forge-dark transition-colors hover:bg-forge-amber-light disabled:cursor-default disabled:opacity-40 cursor-pointer"
          >
            {editWord ? "Update" : "Add Word"}
          </button>
        </div>

        <p className="mt-3 text-right text-[11px] text-slate-400">
          Ctrl + Enter to save
        </p>
      </div>
    </div>
  );
}