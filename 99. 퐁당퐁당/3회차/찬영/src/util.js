const fs = require('fs');

const getImageToBase64 = (path) => {
  const readFile = fs.readFileSync(path);
  const encoded = Buffer.from(readFile).toString('base64');

  return encoded;
};

module.exports = { getImageToBase64 };
