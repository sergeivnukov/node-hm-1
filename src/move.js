const path = require('path');
const fs = require('fs');
const deleteFile = require('./delete');

const move = (fileName, base) => {
  const firstLetter = fileName.split('')[0].toLocaleUpperCase();
  const letterFolder = path.join(global.paths.output, firstLetter);

  if (!fs.existsSync(letterFolder)) {
    fs.mkdirSync(letterFolder);
  }

  fs.linkSync(base, path.join(letterFolder, fileName), err => {
    if (err) {
      console.error(err.message);
    }
  });
  console.log(`....File '${fileName}' ${global.delete ? 'moved' : 'copied'} to '${letterFolder}'`);
  if (global.delete) {
    deleteFile(base);
  }
};

module.exports = move;
