const EleventyFetch = require("@11ty/eleventy-fetch");
const siteMetadata = require("./siteMetadata");
const logger = require("../../_11ty/helpers/logger");
const { ELEVENTY_FETCH_OPTIONS } = require("../../_11ty/constants");
const getFulfilledValues = require("../../_11ty/helpers/getFulfilledValues");
const siteConfig = require("./siteConfig");
const truncateString = require("../../_11ty/helpers/truncateString");

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
        .map(
          ({
            title,
            url,
            date_published,
            summary,
            content_html,
            content_text,
          }) => ({
            title,
            link: url,
            published: date_published || new Date().toISOString(),
            description:
              summary || content_text
                ? truncateString(summary || content_text)
                : content_html,
          })
        )
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .slice(0, siteConfig.maxItemsPerFeed);

      return {
        ...site,
        articles,
      };
    } catch (error) {
      logger.error(`[${site.file}] Error processing JSON feed: ${site.feed}`);
      console.error(error);
      return {};
    }
  });

  const jsonFeedContents = await getFulfilledValues(feedContents);
  return jsonFeedContents;
};
