export type BuddhistEvent = {
  id: string;
  title: string;
  description?: string;
  tradition?: "汉传" | "南传" | "藏传" | "通用";
} & (
  | {
      calendar: "gregorian";
      month: number; // 1-12
      day: number; // 1-31
    }
  | {
      calendar: "lunar";
      lunarMonth: number; // 1-12
      lunarDay: number; // 1-30
      isLeapMonth?: boolean;
    }
);

export type BuddhistRuleEvent = {
  id: string;
  title: string;
  description?: string;
  tradition?: "汉传" | "南传" | "藏传" | "通用";
  calendar: "lunar-rule";
  lunarDays: number[]; // 1-30
};

/**
 * 说明
 * - 主要使用“农历(月-日)”匹配（汉传常见佛历表多数以农历记）。
 * - `isLeapMonth` 仅在闰月纪念日需要标注；不标注则默认“非闰月”。
 */
export const BUDDHIST_EVENTS: BuddhistEvent[] = [
  {
    id: "maitreya-birthday",
    title: "弥勒菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 1,
    lunarDay: 1,
    tradition: "汉传",
  },
  {
    id: "sakyamuni-ordination",
    title: "释迦牟尼佛出家日",
    calendar: "lunar",
    lunarMonth: 2,
    lunarDay: 8,
    tradition: "汉传",
  },
  {
    id: "sakyamuni-parinirvana",
    title: "释迦牟尼佛涅槃日",
    calendar: "lunar",
    lunarMonth: 2,
    lunarDay: 15,
    tradition: "汉传",
  },
  {
    id: "avalokitesvara-birthday",
    title: "观世音菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 2,
    lunarDay: 19,
    tradition: "汉传",
  },
  {
    id: "samantabhadra-birthday",
    title: "普贤菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 2,
    lunarDay: 21,
    tradition: "汉传",
  },
  {
    id: "manjusri-birthday",
    title: "文殊菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 4,
    lunarDay: 4,
    tradition: "汉传",
  },
  {
    id: "buddha-birthday",
    title: "释迦牟尼佛圣诞（浴佛节）",
    calendar: "lunar",
    lunarMonth: 4,
    lunarDay: 8,
    tradition: "汉传",
  },
  {
    id: "guanyin-enlightenment",
    title: "观世音菩萨成道日",
    calendar: "lunar",
    lunarMonth: 6,
    lunarDay: 19,
    tradition: "汉传",
  },
  {
    id: "mahasthamaprapta-birthday",
    title: "大势至菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 7,
    lunarDay: 13,
    tradition: "汉传",
  },
  {
    id: "ksitigarbha-birthday",
    title: "地藏菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 7,
    lunarDay: 30,
    tradition: "汉传",
  },
  {
    id: "guanyin-ordination",
    title: "观世音菩萨出家日",
    calendar: "lunar",
    lunarMonth: 9,
    lunarDay: 19,
    tradition: "汉传",
  },
  {
    id: "bhaisajyaguru-birthday",
    title: "药师琉璃光如来圣诞",
    calendar: "lunar",
    lunarMonth: 9,
    lunarDay: 30,
    tradition: "汉传",
  },
  {
    id: "amitabha-birthday",
    title: "阿弥陀佛圣诞",
    calendar: "lunar",
    lunarMonth: 11,
    lunarDay: 17,
    tradition: "汉传",
  },
  {
    id: "buddha-enlightenment",
    title: "释迦牟尼佛成道日",
    calendar: "lunar",
    lunarMonth: 12,
    lunarDay: 8,
    tradition: "汉传",
  },
  {
    id: "vajrapani-birthday",
    title: "监斋菩萨圣诞",
    calendar: "lunar",
    lunarMonth: 12,
    lunarDay: 23,
    tradition: "汉传",
  },
];

/**
 * 固定日期以外的“规则类”事件（不限定农历月份）
 * - 十斋日：初一、初八、十四、十五、十八、二十三、二十四、二十八、二十九、三十
 * - 六斋日：初八、十四、十五、二十三、二十九、三十
 * - 朔望：初一、十五
 */
export const BUDDHIST_RULES: BuddhistRuleEvent[] = [
  {
    id: "shuo",
    title: "朔日（初一）",
    calendar: "lunar-rule",
    lunarDays: [1],
    tradition: "汉传",
  },
  {
    id: "wang",
    title: "望日（十五）",
    calendar: "lunar-rule",
    lunarDays: [15],
    tradition: "汉传",
  },
  {
    id: "six-zhai",
    title: "六斋日",
    calendar: "lunar-rule",
    lunarDays: [8, 14, 15, 23, 29, 30],
    tradition: "汉传",
    description: "每月固定斋日（若当月无三十，则不出现）。",
  },
  {
    id: "ten-zhai",
    title: "十斋日",
    calendar: "lunar-rule",
    lunarDays: [1, 8, 14, 15, 18, 23, 24, 28, 29, 30],
    tradition: "汉传",
    description: "每月固定斋日（若当月无三十，则不出现）。",
  },
];

