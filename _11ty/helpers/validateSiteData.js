const detectExtraProperties = require("./detectExtraProperties");
const logger = require("./logger");

module.exports = (site) => {
  const { file, name, url, avatar, feed } = site;

  if (!name) {
    logger.warn(`[${file}] Property missing or empty: 'name'`);
  }

  if (!url) {
    logger.warn(`[${file}] Property missing or empty: 'url'`);
  }

  if (!avatar) {
    logger.warn(`[${file}] Property missing or empty: 'avatar'`);
  }

  if (!feed) {
    logger.error(
      `[${file}] Property 'feed' is missing or empty - this site will not be processed!`
    );
  }

  // checking for extraneous object properties in case of typos

  const extraProperties = detectExtraProperties(site);

  if (extraProperties) {
    extraProperties.forEach((extraProperty) => {
      logger.warn(`[${file}] Unknown property: "${extraProperty}"`);
    });
  }
};
