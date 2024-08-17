const fetchJsonFeeds = require("./jsonFeeds");
const fetchXmlFeeds = require("./xmlFeeds");

module.exports = async () => {
  const xmlFeeds = await fetchXmlFeeds();
  const jsonFeeds = await fetchJsonFeeds();

  const allFeeds = [...xmlFeeds, ...jsonFeeds]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((item) => item);

  return allFeeds;
};
