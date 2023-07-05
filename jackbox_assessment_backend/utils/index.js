const fs = require("node:fs/promises");

// parse and return data on disk
const readData = async () => {
  const data = await fs.readFile("users.json", "utf8");
  return JSON.parse(data);
};

// Parse and add data on disk
const writeData = async (data) => {
  await fs.writeFile("users.json", JSON.stringify(data));
};

module.exports = {
  readData,
  writeData,
};
