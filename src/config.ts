export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "慧灯禅语",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
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
  { title: "佛学随笔", href: "/tags/佛学随笔" },
  { title: "禅修笔记", href: "/tags/禅修笔记" },
  { title: "情绪词典", href: "/tags/情绪词典" },
];
