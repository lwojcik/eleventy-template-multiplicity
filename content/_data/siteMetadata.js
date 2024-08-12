const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITES_PATH = path.join(__dirname, "..", "sites");

module.exports = () => {
  const files = fs
    .readdirSync(SITES_PATH)
    .filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(SITES_PATH, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return data;
  });
};
