const siteConfig = require("../content/_data/siteConfig");

module.exports = {
  DEFAULT_FEED_TYPE: "xml",
  ALLOWED_FEED_TYPES: ["xml", "json"],
  SITES_DIRECTORY: "sites",
  ALLOWED_SITE_PROPERTIES: [
    "file",
    "name",
    "url",
    "avatar",
    "feed",
    "feedType",
    "hideFromSiteList",
  ],
  WARNING_PREFIX: "warning",
  ERROR_PREFIX: "ERROR",
  INFO_PREFIX: "info",
  ELEVENTY_FETCH_OPTIONS: {
    duration: siteConfig.localCacheDuration,
    type: "text",
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
