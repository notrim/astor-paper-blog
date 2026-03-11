import { Solar } from "lunar-typescript";

type CalendarEvent =
  | {
      id: string;
      title: string;
      description?: string;
      tradition?: string;
      calendar: "gregorian";
      month: number;
      day: number;
    }
  | {
      id: string;
      title: string;
      description?: string;
      tradition?: string;
      calendar: "lunar";
      lunarMonth: number;
      lunarDay: number;
      isLeapMonth?: boolean;
    };

type RuleEvent = {
  id: string;
  title: string;
  description?: string;
  tradition?: string;
  calendar: "lunar-rule";
  lunarDays: number[];
};

function getData(): { events: CalendarEvent[]; rules: RuleEvent[] } {
  const w = window as any;
  const pack = w?.__FOLI__;
  return {
    events: Array.isArray(pack?.EVENTS) ? pack.EVENTS : [],
    rules: Array.isArray(pack?.RULES) ? pack.RULES : [],
  };
}

function isoToDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getLunarInfo(d: Date) {
  const lunar = Solar.fromDate(d).getLunar();
  const rawMonth = lunar.getMonth(); // leap month encoded as negative
  const isLeapMonth = rawMonth < 0;
  const lunarMonth = Math.abs(rawMonth);
  const lunarDay = lunar.getDay();
  return {
    lunarMonth,
    lunarDay,
    isLeapMonth,
    lunarText: lunar.toString(), // e.g. 二〇二六年正月廿三
  };
}

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function clear(el: Element | null) {
  if (el) el.innerHTML = "";
}

function renderEvents(d: Date) {
  const list = document.getElementById("foli-events");
  const empty = document.getElementById("foli-empty");
  clear(list);

  const { lunarMonth, lunarDay, isLeapMonth } = getLunarInfo(d);
  const solarMonth = d.getMonth() + 1;
  const solarDay = d.getDate();

  const { events, rules } = getData();

  const fixedMatches = events.filter(e => {
    if (e.calendar === "gregorian") {
      return e.month === solarMonth && e.day === solarDay;
    }
    if (e.calendar === "lunar") {
      const leapOk =
        typeof e.isLeapMonth === "boolean" ? e.isLeapMonth === isLeapMonth : !isLeapMonth;
      return leapOk && e.lunarMonth === lunarMonth && e.lunarDay === lunarDay;
    }
    return false;
  });

  const ruleMatches = rules.filter(r => r.lunarDays.includes(lunarDay));

  const matches: Array<
    | CalendarEvent
    | {
        id: string;
        title: string;
        description?: string;
        tradition?: string;
        calendar: "lunar-rule";
        lunarDays: number[];
      }
  > = [];

  const seen = new Set<string>();
  for (const e of [...ruleMatches, ...fixedMatches]) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    matches.push(e);
  }

  if (!matches.length) {
    empty?.classList.remove("hidden");
    return;
  }
  empty?.classList.add("hidden");

  for (const e of matches) {
    const li = document.createElement("li");
    li.className =
      "rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent";

    const title = document.createElement("div");
    title.className = "text-base font-semibold";
    title.textContent = e.title;

    const meta = document.createElement("div");
    meta.className = "mt-1 text-xs text-foreground/70";

    const tag = (e as any).tradition ? ` · ${(e as any).tradition}` : "";
    if ((e as any).calendar === "gregorian") {
      const ge = e as Extract<CalendarEvent, { calendar: "gregorian" }>;
      meta.textContent = `${String(ge.month).padStart(2, "0")}-${String(ge.day).padStart(2, "0")}${tag}`;
    } else if ((e as any).calendar === "lunar") {
      const le = e as Extract<CalendarEvent, { calendar: "lunar" }>;
      meta.textContent = `${le.isLeapMonth ? "闰" : ""}${le.lunarMonth}月${le.lunarDay}日${tag}`;
    } else {
      meta.textContent = `每月 · 初${lunarDay}${tag}`;
    }

    li.appendChild(title);
    li.appendChild(meta);

    if (e.description) {
      const desc = document.createElement("div");
      desc.className = "mt-2 text-sm text-foreground/80 leading-relaxed";
      desc.textContent = e.description;
      li.appendChild(desc);
    }

    list?.appendChild(li);
  }
}

function renderForDate(d: Date) {
  setText("foli-human-date", formatISODate(d));
  const lunarInfo = getLunarInfo(d);
  setText("foli-lunar-date", lunarInfo.lunarText);
  renderEvents(d);
}

function renderYear(year: number) {
  const wrap = document.getElementById("foli-year-list");
  const empty = document.getElementById("foli-year-empty");
  clear(wrap);

  const { events, rules } = getData();

  const rows: Array<{
    date: Date;
    iso: string;
    lunarText: string;
    titles: string[];
  }> = [];

  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= 31; d++) {
      const dt = new Date(year, m, d);
      if (dt.getFullYear() !== year || dt.getMonth() !== m) continue;

      const { lunarMonth, lunarDay, isLeapMonth, lunarText } = getLunarInfo(dt);
      const solarMonth = dt.getMonth() + 1;
      const solarDay = dt.getDate();

      const fixed = events.filter(e => {
        if (e.calendar === "gregorian") return e.month === solarMonth && e.day === solarDay;
        if (e.calendar === "lunar") {
          const leapOk =
            typeof e.isLeapMonth === "boolean" ? e.isLeapMonth === isLeapMonth : !isLeapMonth;
          return leapOk && e.lunarMonth === lunarMonth && e.lunarDay === lunarDay;
        }
        return false;
      });
      const matchedRules = rules.filter(r => r.lunarDays.includes(lunarDay));

      const titles: string[] = [];
      const seen = new Set<string>();
      for (const e of [...matchedRules, ...fixed]) {
        if (seen.has(e.id)) continue;
        seen.add(e.id);
        titles.push(e.title);
      }

      if (titles.length) {
        rows.push({ date: dt, iso: formatISODate(dt), lunarText, titles });
      }
    }
  }

  if (!rows.length) {
    empty?.classList.remove("hidden");
    return;
  }
  empty?.classList.add("hidden");

  // group by month
  const byMonth = new Map<number, typeof rows>();
  for (const r of rows) {
    const mm = r.date.getMonth() + 1;
    const list = byMonth.get(mm) || [];
    list.push(r);
    byMonth.set(mm, list);
  }

  for (const [mm, list] of [...byMonth.entries()].sort((a, b) => a[0] - b[0])) {
    const section = document.createElement("section");
    section.className = "rounded-xl border border-border bg-background p-4";

    const h = document.createElement("div");
    h.className = "text-sm font-semibold";
    h.textContent = `${mm} 月`;
    section.appendChild(h);

    const ul = document.createElement("ul");
    ul.className = "mt-3 grid grid-cols-1 gap-2";

    for (const r of list) {
      const li = document.createElement("li");
      li.className = "rounded-lg border border-border px-3 py-2";

      const line1 = document.createElement("div");
      line1.className = "text-sm font-medium";
      line1.textContent = `${r.iso} · ${r.lunarText}`;

      const line2 = document.createElement("div");
      line2.className = "mt-1 text-xs text-foreground/70 leading-relaxed";
      line2.textContent = r.titles.join("、");

      li.appendChild(line1);
      li.appendChild(line2);
      ul.appendChild(li);
    }

    section.appendChild(ul);
    wrap?.appendChild(section);
  }
}

function init() {
  const dateEl = document.getElementById("foli-date");
  if (!(dateEl instanceof HTMLInputElement)) return;

  const now = new Date();
  const todayISO = formatISODate(now);

  // In view-transitions navigation, old listeners can be lost or duplicated.
  // Clone nodes to reset listeners deterministically.
  const dateInput = dateEl.cloneNode(true) as HTMLInputElement;
  dateEl.replaceWith(dateInput);

  const initialISO = dateInput.value || todayISO;
  dateInput.value = initialISO;
  renderForDate(isoToDate(initialISO));

  dateInput.addEventListener("input", () => {
    if (!dateInput.value) return;
    renderForDate(isoToDate(dateInput.value));
  });

  const yearEl = document.getElementById("foli-year");
  if (yearEl instanceof HTMLInputElement) {
    const yearInput = yearEl.cloneNode(true) as HTMLInputElement;
    yearEl.replaceWith(yearInput);

    const initialYear = Number(yearInput.value) || now.getFullYear();
    yearInput.value = String(initialYear);
    renderYear(initialYear);

    yearInput.addEventListener("input", () => {
      const y = Number(yearInput.value);
      if (!Number.isFinite(y) || y < 1900 || y > 2100) return;
      renderYear(y);
    });
  }
}

function boot() {
  // Astro fires these on initial load and on view transitions route swaps.
  init();
}

document.addEventListener("astro:page-load", boot);
document.addEventListener("astro:after-swap", boot);

// Fallback for environments without Astro events.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

