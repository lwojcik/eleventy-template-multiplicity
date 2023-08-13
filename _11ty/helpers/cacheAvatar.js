const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const slugify = require("./slugify");
const sharp = require("sharp");

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
  try {
    if (!url.startsWith("https://")) {
      return DEFAULT_AVATAR_PATH;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch the avatar: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    const extension = FILE_EXTENSIONS[contentType];

    const fileName = `${slugify(name)}.${extension}`;
    const buffer = await response.buffer();

    let resizedBuffer = buffer;

    if (!FILE_EXTENSIONS_NOT_TO_RESIZE.includes(extension)) {
      const image = sharp(buffer);
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
