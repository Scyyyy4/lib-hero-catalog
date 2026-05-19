export type HeroType = "user" | "guest";

export interface HeroProfile {
  id: string;
  name: string;
  type: HeroType;
  library: string;
  tags: string[];
  bio: string;
  claimedByUserId: string | null;
  createdAt: string;
}

/** Supabase 表 hero_profiles 的一行（select 结果） */
export type HeroProfileRow = {
  id: string;
  name: string;
  type: string;
  library: string;
  tags: string[] | null;
  bio: string;
  claimed_by_user_id: string | null;
  created_at: string;
};
