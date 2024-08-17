const fetchJsonFeeds = require("./jsonFeeds");
const fetchRssFeeds = require("./rssFeeds");

module.exports = async () => {
  const rssFeeds = await fetchRssFeeds();
  const jsonFeeds = await fetchJsonFeeds();

  const allFeeds = [...rssFeeds, ...jsonFeeds]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((item) => item);

  return allFeeds;
};
