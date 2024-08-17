const path = require("path");
const siteConfig = require("../content/_data/siteConfig");

module.exports = {
  DEFAULT_FEED_TYPE: "rss",
  ALLOWED_FEED_TYPES: ["rss", "json"],
  SITES_DIRECTORY: path.join("content", "sites"),
  ALLOWED_SITE_PROPERTIES: [
    "file",
    "name",
    "url",
    "avatar",
    "feed",
    "feedType",
    "hideFromSiteList",
    "disable",
  ],
  WARNING_PREFIX: "warning",
  ERROR_PREFIX: "ERROR",
  INFO_PREFIX: "info",
  VERBOSE_PREFIX: 'verbose',
  ELEVENTY_FETCH_OPTIONS: {
    duration: siteConfig.localCacheDuration,
    verbose: process.env.ELEVENTY_ENV === "development",
    directory: siteConfig.cacheDirectory,
    dryRun: siteConfig.cacheDryRun,
    fetchOptions: {
      headers: {
        "user-agent": siteConfig.userAgent,
      },
    },
  },
};
