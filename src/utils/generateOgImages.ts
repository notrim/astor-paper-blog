import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

function fallbackOgSvg() {
  // Avoid any text rendering (which requires fonts).
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fefbfb" />
  <rect x="60" y="60" width="1080" height="510" fill="#ecebeb" stroke="#000" stroke-width="4" opacity="0.9"/>
  <rect x="80" y="80" width="1040" height="470" fill="#fefbfb" stroke="#000" stroke-width="4"/>
</svg>`;
}

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  try {
    const svg = await postOgImage(post);
    return svgBufferToPngBuffer(svg);
  } catch {
    return svgBufferToPngBuffer(fallbackOgSvg());
  }
}

export async function generateOgImageForSite() {
  try {
    const svg = await siteOgImage();
    return svgBufferToPngBuffer(svg);
  } catch {
    return svgBufferToPngBuffer(fallbackOgSvg());
  }
}
