const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const slugify = require("./slugify");
const sharp = require("sharp"); // Import the sharp library

const DIST_PATH = "_site";
const AVATAR_DIR = path.join("images", "avatars");
const DEFAULT_AVATAR_FILE = "default_avatar.jpg";
const DEFAULT_AVATAR_PATH = path.join("/", "images", DEFAULT_AVATAR_FILE);

module.exports = async ({ url, name }) => {
  try {
    const avatarExtension = url.split(".").pop();
    const fileName = `${slugify(name)}.${avatarExtension}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch the avatar: ${response.status} ${response.statusText}`
      );
    }

    const buffer = await response.buffer();

    const contentType = response.headers.get("content-type");
    if (
      (contentType && contentType.includes("image/svg+xml")) ||
      (contentType && contentType.includes("image/vnd.microsoft.icon"))
    ) {
      const savePath = path.join(DIST_PATH, AVATAR_DIR, fileName);

      const dirPath = path.dirname(savePath);
      fs.mkdirSync(dirPath, { recursive: true });

      fs.writeFileSync(savePath, buffer);

      return path.join("/", AVATAR_DIR, fileName);
    }

    let resizedBuffer = buffer;

    const image = sharp(buffer);
    const metadata = await image.metadata();
    if (metadata.width > 64 || metadata.height > 64) {
      resizedBuffer = await image.resize(64, 64).toBuffer();
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
