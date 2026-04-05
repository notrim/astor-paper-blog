export const SITE = {
  website: "https://huidengchan.com/", // replace this with your deployed domain
  author: "慧灯禅语",
  profile: "https://huidengchan.com/",
  desc: "分享佛学智慧，探索内心宁静",
  title: "慧灯禅语",
  ogImage: "favicon.png",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "编辑页面",
    url: "https://github.com/notrim/astor-paper-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

export type NavLink = {
  title: string;
  href: string;
};

/**
 * Top navigation links.
 *
 * Note: 这里使用 `/tags/<tag>` 形式，点击后会进入对应标签聚合页。
 * 为满足“点击均有内容承接”的验收标准，请确保文章里确实存在这些 tags。
 */
export const NAV_LINKS: NavLink[] = [
  { title: "心经解读", href: "/tags/心经解读" },
  { title: "佛教经文音频", href: "/tags/佛教经文音频" },
  { title: "禅修笔记", href: "/tags/禅修笔记" },
  { title: "情绪词典", href: "/tags/情绪词典" },
  { title: "佛历", href: "/foli" },
];
