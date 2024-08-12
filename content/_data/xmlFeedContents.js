const EleventyFetch = require("@11ty/eleventy-fetch");
const feedExtractor = import("@extractus/feed-extractor");
const siteMetadata = require("./siteMetadata");
const logger = require("../../_11ty/helpers/logger");
const { ELEVENTY_FETCH_OPTIONS } = require("../../_11ty/constants");
const getFulfilledValues = require("../../_11ty/helpers/getFulfilledValues");
const siteConfig = require("./siteConfig");
const truncateString = require("../../_11ty/helpers/truncateString");

module.exports = async () => {
  const xmlFeedSites = siteMetadata().filter((site) => site.feedType === "xml");
  const extractor = await feedExtractor;

  const feedContents = await xmlFeedSites.map(async (site) => {
    try {
      const feedData = await EleventyFetch(site.feed, ELEVENTY_FETCH_OPTIONS);
      const { entries } = extractor.extractFromXml(feedData);

      const articles = entries
        .map(({ title, link, published, description }) => ({
          title,
          link,
          published,
          description: truncateString(description),
        }))
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, siteConfig.maxItemsPerFeed);

      return {
        ...site,
        articles,
      };
    } catch (error) {
      logger.error(
        `[${site.file}] Error processing RSS/Atom feed: ${site.feed}`
      );
      console.error(error);
      return {};
    }
  });

  const xmlFeedContents = await getFulfilledValues(feedContents);
  return xmlFeedContents;
};
