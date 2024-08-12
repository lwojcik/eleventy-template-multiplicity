const path = require("path");
const siteConfig = require("../content/_data/siteConfig");
const EleventyFetch = require("@11ty/eleventy-fetch");

const { localCacheDuration: LOCAL_CACHE_DURATION } = siteConfig;

const AVAILABLE_DATA_TYPES = ["json", "text", "buffer"];

export const fetchFromApi = async ({
  url,
  type = "json",
  duration = LOCAL_CACHE_DURATION,
}) => {
  if (!url) {
    throw new Error("Fetching error: no URL to fetch provided");
  }

  if (!dataTypes.includes(type)) {
    throw new Error(
      `Invalid data type: ${type}, available types: ${AVAILABLE_DATA_TYPES.map(
        (type) => type
      )}`
    );
  }

  return EleventyFetch(url, {
    duration,
    type,
    verbose: process.env.ELEVENTY_ENV === "development",
  });
};
