const path = require('path');
const fs = require('fs');

const copyFile = (fileName, base, resultFolder) => {
  const firstLetter = fileName.split('')[0].toLocaleUpperCase();
  const letterFolder = path.join(resultFolder, firstLetter);

  // copy file
  const copy = () => {
    fs.link(base, path.join(letterFolder, fileName), err => {
      if (err) {
        console.error(err.message);
        process.exit(1);
      } else {
        console.log(`....File '${fileName}' copied to ${letterFolder}`);
      }
    });
  };

  // check, if folder exists
  fs.access(letterFolder, (err) => {
    if (err) {
      // create folder
      fs.mkdir(letterFolder, () => {
        copy();
      });
    } else {
      copy();
    }
  });
};

module.exports = copyFile;
