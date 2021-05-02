const fs = require('fs');
const path = require('path');
const move = require('./move');

const fileExceptions = ['.DS_Store']; // exclude macOS files

const parseFiles = (base, level = 0) => {
  const files = fs.readdirSync(base);
  const filteredFiles = files.filter((file) => !fileExceptions.includes(file));

  filteredFiles.forEach(fileName => {
    const localBase = path.join(base, fileName);
    const state = fs.statSync(localBase);

    if (state.isDirectory()) {
      parseFiles(localBase, level + 1);
    } else {
      move(fileName, localBase);
    }
  });

  if (global.delete) {
    fs.rmdir(base, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('✓ Entry folder was deleted');
    });
  }
};

module.exports = parseFiles;
