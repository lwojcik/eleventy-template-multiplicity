const fetchAllFeeds = require("../../_11ty/api/allFeeds");
const validateFeedEntry = require("../../_11ty/helpers/validateFeedEntry");

module.exports = async () => {
  const allFeeds = await fetchAllFeeds();

  return allFeeds
    .map(({ name, url: siteUrl, avatar, articles }) =>
      articles.map(({ title, published, link, description }) => {
        const item = {
          name,
          siteUrl,
          url: link,
          avatar,
          published,
          title,
          description,
        };

        validateFeedEntry(item);

        return item;
      })
    )
    .flat()
    .map((item) => item)
    .sort((a, b) => new Date(b.published) - new Date(a.published));
};
