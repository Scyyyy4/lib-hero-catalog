/** 与前端 DiaryCard、data/mock 对齐；数据库列为 snake_case，读取时再映射 */
export type Mood = "平静" | "充实" | "疲惫" | "期待" | "有点乱";

export type DiaryEntry = {
  id: string;
  date: string;
  library: string;
  studyTopic: string;
  mood: Mood;
  note: string;
};

/** Supabase 表 diary_entries 的一行（select 结果） */
export type DiaryEntryRow = {
  id: string;
  date: string;
  library: string;
  study_topic: string;
  mood: string;
  note: string;
  created_at?: string;
};
