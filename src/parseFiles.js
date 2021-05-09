const fs = require('fs');
const path = require('path');
const util = require('util');
const copyFile = require('./copyFile');

const fileExceptions = ['.DS_Store']; // exclude macOS files
const asyncReadDir = util.promisify(fs.readdir);
const asyncStat = util.promisify(fs.stat);

const parseFiles = async (base, resultFolder) => {
  let files = [];

  try {
    files = await asyncReadDir(base);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const filteredFiles = files.filter((file) => !fileExceptions.includes(file));

  for (const fileName of filteredFiles) {
    const localBase = path.join(base, fileName);
    let stat;

    try {
      stat = await asyncStat(localBase);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }

    if (stat.isDirectory()) {
      await parseFiles(localBase, resultFolder);
    } else {
      await copyFile(fileName, localBase, resultFolder);
    }
  }
};

module.exports = parseFiles;
