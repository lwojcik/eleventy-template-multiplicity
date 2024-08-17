const logger = require("./logger");

module.exports = (item) => {
  if (!item.title) {
    logger.verbose(`[${item.name}] Article without title detected`);
  }

  if (!item.published) {
    logger.verbose(`[${item.name}] Article without publication date detected - using build date instead`);
  }


  if (!item.description) {
    logger.verbose(`[${item.name}] Article without description detected`);
  }

  const isItemIncomplete = !item.title && !item.description;

  if (isItemIncomplete) {
    logger.verbose(`[${item.name}] Skipping article without title and description`)
  }

  return isItemIncomplete;
};
