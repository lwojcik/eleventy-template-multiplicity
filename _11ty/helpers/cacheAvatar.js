const fs = require("fs");
const path = require("path");
const EleventyFetch = require("@11ty/eleventy-fetch");
const imageType = import("image-type");
const isSvg = import("is-svg");
const slugify = require("./slugify");
const sharp = require("sharp");
const siteConfig = require("../../content/_data/siteConfig");

const DIST_PATH = "_site";
const AVATAR_DIR = path.join("images", "avatars");
const DEFAULT_AVATAR_FILE = "default_avatar.jpg";
const DEFAULT_AVATAR_PATH = path.join("/", "images", DEFAULT_AVATAR_FILE);

const FILE_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

const FILE_EXTENSIONS_NOT_TO_RESIZE = ["svg", "ico"];

module.exports = async ({ url, name }) => {
  const detectImageType = (await imageType).default;
  const detectSvg = (await isSvg).default;

  try {
    if (url.startsWith("/")) {
      return url;
    }

    const imageBuffer = await EleventyFetch(url, {
      duration: siteConfig.localCacheDuration,
      verbose: process.env.ELEVENTY_ENV === "development",
      fetchOptions: {
        headers: {
          "user-agent": siteConfig.userAgent,
        },
      },
    });

    const isFileSvg = detectSvg(imageBuffer.toString());

    const { mime: contentType } = isFileSvg
      ? { mime: "image/svg+xml" }
      : await detectImageType(imageBuffer);

    const extension = FILE_EXTENSIONS[contentType];

    const fileName = `${slugify(name)}.${extension}`;

    let resizedBuffer = imageBuffer;

    if (!FILE_EXTENSIONS_NOT_TO_RESIZE.includes(extension)) {
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
      if (metadata.width > 64 || metadata.height > 64) {
        resizedBuffer = await image.resize(64, 64).toBuffer();
      }
    }

    const savePath = path.join(DIST_PATH, AVATAR_DIR, fileName);
    const dirPath = path.dirname(savePath);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(savePath, resizedBuffer);

    return path.join("/", AVATAR_DIR, fileName);
  } catch (error) {
    console.log(error);
    return DEFAULT_AVATAR_PATH;
  }
};
