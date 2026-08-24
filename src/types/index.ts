export interface WordEntry {
  id: string;
  word: string;
  meaning: string;
  example: string;
  date: string;
}

export interface DateGroup {
  label: string;
  items: WordEntry[];
}