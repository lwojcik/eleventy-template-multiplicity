const EleventyFetch = require("@11ty/eleventy-fetch");
const feedExtractor = import("@extractus/feed-extractor");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const cacheAvatar = require("./_11ty/helpers/cacheAvatar");
const addHash = require("./_11ty/helpers/addHash");
const getFulfilledValues = require("./_11ty/helpers/getFulfilledValues");
const readableDate = require("./_11ty/helpers/readableDate");
const minifyHTML = require("./_11ty/helpers/minifyHTML");
const siteConfig = require("./content/_data/siteConfig");
const minifyXML = require("./_11ty/helpers/minifyXML");
const stripAndTruncateHTML = require("./_11ty/helpers/stripAndTruncateHTML");

module.exports = function (eleventyConfig) {
  // --- Copy assets

  eleventyConfig.addPassthroughCopy({
    assets: ".",
    "assets/images": "images",
    "assets/js": "js",
  });

  // --- Layout aliases

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("index", "layouts/index.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");

  // --- Filters

  eleventyConfig.addFilter("addHash", addHash);
  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter(
    "alwaysProductionUrl",
    (path) => new URL(path, siteConfig.url)
  );

  // --- Collections

  eleventyConfig.addCollection("articles", async function (collectionApi) {
    try {
      const extractor = await feedExtractor;
      const blogs = collectionApi
        .getFilteredByTag("site")
        .filter((item) => !item.data.disabled);

      const allSiteFeeds = blogs.map(async (blog) => {
        try {
          const { data } = blog;
          const { name, url, avatar, feed, feedType } = data;

          const feedData = await EleventyFetch(feed, {
            duration: siteConfig.localCacheDuration,
            type: feedType === "json" ? "json" : "text",
            verbose: process.env.ELEVENTY_ENV === "development",
            fetchOptions: {
              headers: {
                "user-agent": siteConfig.userAgent,
              },
            },
          });

          const parsedFeedData =
            feedType === "json" && typeof feedData === "string"
              ? JSON.parse(feedData)
              : feedData;

          const feedContent =
            feedType === "json"
              ? {
                  entries: parsedFeedData.items.map((item) => ({
                    ...item,
                    published: item.date_published,
                    description: stripAndTruncateHTML(
                      item.content_html,
                      siteConfig.maxPostLength
                    ),
                  })),
                }
              : extractor.extractFromXml(feedData);

          return feedContent.entries
            .map((entry) => ({
              ...entry,
              avatar,
              author: {
                name,
                url,
              },
            }))
            .sort((a, b) => new Date(b.published) - new Date(a.published))
            .slice(0, siteConfig.maxItemsPerFeed);
        } catch (error) {
          console.log(error);
        }
      });

      const allArticles = await getFulfilledValues(allSiteFeeds);

      const sortedItems = allArticles
        .flat()
        .sort((a, b) => new Date(b.published) - new Date(a.published));

      return sortedItems;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });

  eleventyConfig.addCollection("sites", async function (collectionApi) {
    const sites = collectionApi
      .getFilteredByTag("site")
      .filter((item) => !item.data.disabled)
      .slice()
      .sort((a, b) => a.data.name.localeCompare(b.data.name));

    const sitesWithCachedAvatars = await Promise.all(
      sites.map(async (site) => {
        const cachedAvatar = await cacheAvatar({
          url: site.data.avatar,
          name: site.data.name,
        });
        site.data.avatar = cachedAvatar;
        return site;
      })
    );

    return sitesWithCachedAvatars;
  });

  // --- Plugins

  eleventyConfig.addPlugin(faviconsPlugin, {
    manifestData: {
      name: siteConfig.title,
      lang: siteConfig.language,
      short_name: siteConfig.title,
      description: siteConfig.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#191818",
      background_color: "#191818",
      orientation: "any",
    },
  });

  eleventyConfig.addPlugin(pluginRss);

  // --- Transforms

  eleventyConfig.addTransform("minifyHTML", minifyHTML);
  eleventyConfig.addTransform("minifyXML", minifyXML);

  return {
    dir: {
      input: "content",
    },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
