const fs = require('fs');
const path = require('path');
const copyFile = require('./copyFile');

const fileExceptions = ['.DS_Store']; // exclude macOS files

const parseFiles = (base, resultFolder) => {
  fs.readdir(base, (err, files) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    const filteredFiles = files.filter((file) => !fileExceptions.includes(file));

    filteredFiles.forEach(fileName => {
      const localBase = path.join(base, fileName);

      fs.stat(localBase, (err, stat) => {
        if (err) {
          console.error(err.message);
          process.exit(1);
        }
        if (stat.isDirectory()) {
          parseFiles(localBase, resultFolder);
        } else {
          copyFile(fileName, localBase, resultFolder);
        }
      });
    });
  });
};

module.exports = parseFiles;
