const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const validateSiteData = require("../helpers/validateSiteData");
const {
  DEFAULT_FEED_TYPE,
  ALLOWED_FEED_TYPES,
  SITES_DIRECTORY,
} = require("../constants");
const logger = require("../helpers/logger");

const SITES_PATH = path.join(__dirname, "..", "..", SITES_DIRECTORY);

const parseFeedType = (feedType, file) => {
  if (feedType && !ALLOWED_FEED_TYPES.includes(feedType)) {
    logger.warn(
      `[${file}] Unknown feedType: "${feedType}" - using ${DEFAULT_FEED_TYPE} instead`
    );

    return DEFAULT_FEED_TYPE;
  }

  if (!feedType) {
    return DEFAULT_FEED_TYPE;
  }

  return feedType;
};

module.exports = () => {
  const files = fs
    .readdirSync(SITES_PATH)
    .filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const filePath = path.join(SITES_PATH, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContents);

      const siteMetadata = {
        file: file.split('.')[0],
        ...data,
        feedType: parseFeedType(data.feedType, file),
      };

      validateSiteData(siteMetadata);

      return siteMetadata;
    })
    .filter((item) => !item.disable);
};
