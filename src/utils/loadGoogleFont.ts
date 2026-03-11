import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Failed to download dynamic font");

  const res = await fetch(resource[1]);

  if (!res.ok) {
    throw new Error("Failed to download dynamic font. Status: " + res.status);
  }

  return res.arrayBuffer();
}

async function loadLocalFallbackFont(): Promise<ArrayBuffer | null> {
  const candidateDirs = [
    path.join(process.cwd(), "node_modules", ".astro", "fonts"),
    path.join(process.cwd(), ".astro", "fonts"),
  ];

  for (const dir of candidateDirs) {
    try {
      const files = await readdir(dir);
      const woff2 = files.find(f => f.toLowerCase().endsWith(".woff2"));
      if (!woff2) continue;
      const buf = await readFile(path.join(dir, woff2));
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    } catch {
      // ignore and try next dir
    }
  }

  return null;
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 700,
      style: "bold",
    },
  ];

  const results = await Promise.allSettled(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text, weight);
      return { name, data, weight, style };
    })
  );

  const fonts = results
    .filter(
      (r): r is PromiseFulfilledResult<{
        name: string;
        data: ArrayBuffer;
        weight: number;
        style: string;
      }> => r.status === "fulfilled"
    )
    .map(r => r.value);

  // If fetching fonts fails (e.g. CI/offline), return empty array so build doesn't fail.
  if (fonts.length > 0) return fonts;

  const fallback = await loadLocalFallbackFont();
  if (!fallback) return fonts;

  return [{ name: "Fallback", data: fallback, weight: 400, style: "normal" }];
}

export default loadGoogleFonts;
