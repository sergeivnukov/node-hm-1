const fs = require('fs');

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = deleteFile;
