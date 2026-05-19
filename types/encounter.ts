export interface Encounter {
  id: string;
  heroName: string;
  library: string;
  date: string;
  impression: string;
  rating: number;
  note: string;
  createdAt: string;
}

/** Supabase 表 encounters 的一行（select 结果） */
export type EncounterRow = {
  id: string;
  hero_name: string;
  library: string;
  date: string;
  impression: string;
  rating: number;
  note: string;
  created_at: string;
};
