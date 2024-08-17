const fetchAllFeeds = require("../../_11ty/api/allFeeds");
const fetchAvatars = require("../../_11ty/helpers/fetchAvatars");
const validateFeedEntry = require("../../_11ty/helpers/validateFeedEntry");

module.exports = async () => {
  const allFeeds = await fetchAllFeeds();
  const avatarNames = await fetchAvatars(allFeeds);

  return allFeeds
    .map(({ file, name, url: siteUrl, articles }) =>
      articles.map(({ title, published, link, description }) => {
        const avatar = avatarNames.find(({ name }) => name === file).url;

        const item = {
          name,
          siteUrl,
          url: link,
          avatar,
          published,
          title,
          description,
        };

        const isArticleInvalid = validateFeedEntry(item);

        if (isArticleInvalid) return {};

        return item;
      })
    )
    .flat()
    .map((item) => item)
    .sort((a, b) => new Date(b.published) - new Date(a.published));
};
