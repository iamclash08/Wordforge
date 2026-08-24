import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import type { WordEntry, DateGroup as DateGroupType } from "./types";
import { formatDate, getDateKey } from "./utils/dates";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DateGroup from "./components/DateGroup";
import AddWordModal from "./components/AddWordModal";
import EmptyState from "./components/EmptyState";

export default function App() {
  const [words, setWords] = useLocalStorage<WordEntry[]>(
    "wordforge_words",
    []
  );
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editWord, setEditWord] = useState<WordEntry | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setEditWord(null);
        setModalOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleAddWord = useCallback(
    (data: Pick<WordEntry, "word" | "meaning" | "example">) => {
      if (editWord) {
        setWords((prev) =>
          prev.map((w) => (w.id === editWord.id ? { ...w, ...data } : w))
        );
        setEditWord(null);
      } else {
        const entry: WordEntry = {
          ...data,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        setWords((prev) => [entry, ...prev]);
      }
    },
    [editWord, setWords]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setWords((prev) => prev.filter((w) => w.id !== id));
    },
    [setWords]
  );

  const handleEdit = useCallback((entry: WordEntry) => {
    setEditWord(entry);
    setModalOpen(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    setEditWord(null);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditWord(null);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.toLowerCase();
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        (w.example && w.example.toLowerCase().includes(q))
    );
  }, [words, search]);

  const grouped = useMemo<DateGroupType[]>(() => {
    const map = new Map<string, DateGroupType>();
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const w of sorted) {
      const key = getDateKey(w.date);
      if (!map.has(key)) {
        map.set(key, { label: formatDate(w.date), items: [] });
      }
      map.get(key)!.items.push(w);
    }

    return [...map.values()];
  }, [filtered]);

  const todayCount = words.filter(
    (w) => getDateKey(w.date) === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-forge-bg font-body">
      <Header
        totalWords={words.length}
        todayCount={todayCount}
        onAddClick={handleOpenModal}
      />

      <div className="mx-auto max-w-[900px] px-6 pt-5">
        <SearchBar ref={searchRef} value={search} onChange={setSearch} />
      </div>

      <main className="mx-auto max-w-[900px] px-6 pb-16 pt-2">
        {grouped.length === 0 ? (
          <EmptyState
            isSearching={search.trim().length > 0}
            onAddClick={handleOpenModal}
          />
        ) : (
          grouped.map((group) => (
            <DateGroup
              key={group.label}
              group={group}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </main>

      <AddWordModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddWord}
        editWord={editWord}
      />
    </div>
  );
}