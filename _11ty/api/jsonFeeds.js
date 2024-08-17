const EleventyFetch = require("@11ty/eleventy-fetch");
const siteMetadata = require("./siteMetadata");
const logger = require("../helpers/logger");
const { ELEVENTY_FETCH_OPTIONS } = require("../constants");
const getFulfilledValues = require("../helpers/getFulfilledValues");
const siteConfig = require("../../content/_data/siteConfig");
const stripAndTruncateHTML = require("../helpers/stripAndTruncateHTML");

module.exports = async () => {
  const jsonFeedSites = siteMetadata().filter(
    (site) => site.feedType === "json"
  );

  const feedContents = await jsonFeedSites.map(async (site) => {
    try {
      const feedData = await EleventyFetch(site.feed, {
        ...ELEVENTY_FETCH_OPTIONS,
        type: "json",
      });

      const articles = feedData.items
        .map((item) => ({
          title: item.title || siteConfig.defaultArticleTitle,
          link: item.url,
          published: item.date_published || new Date().toISOString(),
          description: stripAndTruncateHTML(
            item.summary || item.content_text || item.content_html,
            siteConfig.maxPostLength
          ),
        }))
        .filter((item) => item)
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, siteConfig.maxItemsPerFeed);

      return {
        ...site,
        articles,
      };
    } catch (error) {
      logger.error(`[${site.file}] Error processing JSON feed: ${site.feed}`);
      console.error(error);
    }
  });

  return getFulfilledValues(feedContents);
};
