import * as cheerio from "cheerio";

export const parseHTML = (html) => {
  const $ = cheerio.load(html);

  const rawTitle = $("title").text().trim();

const title = rawTitle
  .replace(/\s*[-|–].*$/, "")
  .replace(/Close$/i, "")
  .trim() || "No title found";

  const metaDescription =
    $('meta[name="description"]').attr("content") ||
    "No meta description found";

  const h1Count = $("h1").length;

  const missingAltImages = $("img")
    .toArray()
    .filter((img) => !$(img).attr("alt") || $(img).attr("alt").trim() === "")
    .length;

  const wordCount = $("body")
    .text()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  return {
    title,
    metaDescription,
    h1Count,
    missingAltImages,
    wordCount,
  };
};