const feedExtractor = import("@extractus/feed-extractor");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginPWA = require("eleventy-plugin-pwa-v2");
const cacheAvatar = require("./_11ty/helpers/cacheAvatar");
const addHash = require("./_11ty/helpers/addHash");
const getFulfilledValues = require("./_11ty/helpers/getFulfilledValues");
const readableDate = require("./_11ty/helpers/readableDate");
const minifyHTML = require("./_11ty/helpers/minifyHTML");
const siteConfig = require("./content/_data/siteConfig");
const minifyXML = require("./_11ty/helpers/minifyXML");

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
      const { extract } = await feedExtractor;
      const blogs = collectionApi.getFilteredByTag("site");

      const allSiteFeeds = blogs.map(async (blog) => {
        const { data } = blog;
        const { name, url, avatar, feed } = data;

        const feedContent = await extract(feed, {
          descriptionMaxLen: siteConfig.maxPostLength,
        });

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

  if (siteConfig.enablePWA) {
    eleventyConfig.addPlugin(pluginPWA, {
      cacheId: "blognik",
      runtimeCaching: [
        {
          urlPattern: /\/$/,
          handler: "NetworkFirst",
        },
        {
          urlPattern: /\.html$/,
          handler: "NetworkFirst",
        },
        {
          urlPattern:
            /^.*\.(jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
          handler: "StaleWhileRevalidate",
        },
      ],
    });
  }

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
