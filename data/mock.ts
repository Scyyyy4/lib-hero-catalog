/**
 * 前端静态假数据，字段命名便于后续映射到 Supabase 表结构。
 * heroes / diary_entries / encounters 等表可按同名或 snake_case 对齐。
 */

export type HeroType = "用户" | "非用户";

export type Hero = {
  id: string;
  name: string;
  type: HeroType;
  /** 常出现或主要关联的 library，多馆可用分号拼接 */
  library: string;
  tags: string[];
  bio: string;
};

export type Mood = "平静" | "充实" | "疲惫" | "期待" | "有点乱";

export type DiaryEntry = {
  id: string;
  date: string;
  library: string;
  studyTopic: string;
  mood: Mood;
  note: string;
};

export type Encounter = {
  id: string;
  heroName: string;
  library: string;
  date: string;
  impression: string;
  /** 1–5，主观「想再遇见」或「印象强度」 */
  rating: number;
};

export const heroes: Hero[] = [
  {
    id: "1",
    name: "阿梧",
    type: "用户",
    library: "市立图书馆 · 三楼自习区",
    tags: ["常驻", "笔记达人", "咖啡自带杯"],
    bio: "总在靠窗那一排，草稿纸上画满小格子，偶尔抬头会对路过的人轻轻点头。",
  },
  {
    id: "2",
    name: "穿灰卫衣的陌生人",
    type: "非用户",
    library: "大学图书馆 · 北区",
    tags: ["偶遇", "安静", "雨天"],
    bio: "雨天才出现，把伞折得很整齐放在桌边，读得很慢，像在和书页商量什么。",
  },
  {
    id: "3",
    name: "小林",
    type: "用户",
    library: "社区图书室；市立图书馆",
    tags: ["跨馆", "备考中", "爱分享零食"],
    bio: "包里常备薄荷糖，会在闭馆前五分钟提醒大家收拾东西，像温柔的值班员。",
  },
  {
    id: "4",
    name: "柜台后的老师傅",
    type: "非用户",
    library: "社区图书室",
    tags: ["工作人员", "盖章声", "老台灯"],
    bio: "从不催促，只在你发呆太久时轻敲一下台面，像在提醒：时间还在走，你也可以继续。",
  },
];

export const diaryEntries: DiaryEntry[] = [
  {
    id: "d1",
    date: "2026-05-12",
    library: "市立图书馆 · 三楼自习区",
    studyTopic:
      "复习了半章线性代数，整理了错题本；顺带读了几页散文换脑子。",
    mood: "充实",
    note: "闭馆音乐响起时，邻座的人一起收拾东西，有种默契的告别感。",
  },
  {
    id: "d2",
    date: "2026-05-08",
    library: "大学图书馆 · 北区",
    studyTopic: "写课程论文大纲，查了两篇参考文献，没写完但方向清楚了。",
    mood: "平静",
    note: "窗外在下雨，馆内灯很柔，适合发呆五秒钟再继续。",
  },
  {
    id: "d3",
    date: "2026-05-03",
    library: "社区图书室",
    studyTopic:
      "带了一本小说，实际只看了二十页，剩下时间在观察人和书架。",
    mood: "有点乱",
    note: "小孩在儿童区笑得很响，居然没觉得吵，反而记了一笔「馆内白噪音」。",
  },
];

export const encounters: Encounter[] = [
  {
    id: "e1",
    heroName: "阿梧",
    library: "市立图书馆 · 三楼自习区",
    date: "2026-05-14",
    impression:
      "借过一支笔，还回来的时候笔帽转得很紧，像怕弄丢别人的小习惯。",
    rating: 5,
  },
  {
    id: "e2",
    heroName: "穿灰卫衣的陌生人",
    library: "大学图书馆 · 北区",
    date: "2026-05-09",
    impression:
      "在索引架前擦肩而过，对方让了半步，那半步让人记了很久。",
    rating: 4,
  },
  {
    id: "e3",
    heroName: "小林",
    library: "社区图书室",
    date: "2026-05-01",
    impression:
      "闭馆前分了一颗薄荷糖，说「下周可能换到北区」，像留下一个可续写的伏笔。",
    rating: 5,
  },
  {
    id: "e4",
    heroName: "柜台后的老师傅",
    library: "社区图书室",
    date: "2026-04-20",
    impression: "还书时多看了封面一眼，被问「好看吗」，像被轻轻推回阅读本身。",
    rating: 4,
  },
];
