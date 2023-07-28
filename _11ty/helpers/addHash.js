const { DateTime } = require("luxon");

module.exports = (url) => {
  const [urlPart, paramPart] = url.split("?");
  const params = new URLSearchParams(paramPart || "");
  params.set("v", DateTime.local().toFormat("X"));
  return `${urlPart}?${params}`;
};
