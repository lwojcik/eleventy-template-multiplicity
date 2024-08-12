const fetchAllFeeds = require("../../_11ty/api/allFeeds");

module.exports = async () => {
  const allFeeds = await fetchAllFeeds();

  return allFeeds
    .map(({ name, url, avatar, articles }) =>
      articles.map(({ title, published, description }) => ({
        name,
        url,
        avatar,
        published,
        title,
        description,
      }))
    )
    .flat()
    .map((item) => item)
    .sort((a, b) => new Date(b.published) - new Date(a.published));
};
