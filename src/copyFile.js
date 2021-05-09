const path = require('path');
const fs = require('fs');
const util = require('util');

const asyncLink = util.promisify(fs.link);
const asyncAccess = util.promisify(fs.access);
const asyncMkdir = util.promisify(fs.mkdir);

const copyFile = async (fileName, base, resultFolder) => {
  const firstLetter = fileName.split('')[0].toLocaleUpperCase();
  const letterFolder = path.join(resultFolder, firstLetter);

  try {
    await asyncAccess(letterFolder);
  } catch (err) {
    await asyncMkdir(letterFolder);
  }

  try {
    await asyncLink(base, path.join(letterFolder, fileName));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log(`....File '${fileName}' copied to ${letterFolder}`);
};

module.exports = copyFile;
