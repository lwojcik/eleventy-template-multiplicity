const cacheAvatar = require("./cacheAvatar");

module.exports = async (allFeeds) => {
  return await Promise.all(
    allFeeds.map(({ avatar, file }) => 
      cacheAvatar({ url: avatar, name: file })
    )
  );    
}