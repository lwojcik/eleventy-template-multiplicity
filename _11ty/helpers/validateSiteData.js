// const log = (message) => {
//   console.log(`${LOG_PREFIX} [error] ${message}`);
// };

const detectExtraProperties = require("./detectExtraProperties");
const logger = require("./logger/logger");

module.exports = (site) => {
  if (!site.name) {
    logger.warn(`[${site.file}] 'name' attribute is missing or empty`);
  }

  if (!site.url) {
    logger.warn(`[${site.file}] 'url' attribute is missing or empty`);
  }

  if (!site.avatar) {
    logger.warn(`[${site.file}] 'avatar' attribute is missing or empty`);
  }

  if (!site.feed) {
    logger.error(
      `[${site.file}] 'feed' attribute is missing or empty - this site will not be processed!`
    );
  }

  // checking for extraneous object properties (e.g. typos)

  const extraProperties = detectExtraProperties(site);

  if (extraProperties) {
    extraProperties.forEach((extraProperty) => {
      logger.warn(`[${site.file}] Unknown property: "${extraProperty}"`);
    });
  }
};
