const axios = require('axios');
const { randomUUID } = require('crypto');
const { join } = require('path');

const { getImageToBase64 } = require('./util');

const {
  naverCloud: { textOCR: textOCRConfig },
} = require('../config');

class TextOCR {
  #axiosInstance;

  constructor() {
    this.#axiosInstance = axios.default.create({
      baseURL: textOCRConfig.invokeUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-OCR-SECRET': textOCRConfig.secretKey,
      },
    });
  }

  async request(localFilePath) {
    const [filename, format] = localFilePath.split('/').pop().split('.');

    const timestamp = +new Date();
    const requestId = randomUUID();

    const { data } = await this.#axiosInstance.post(textOCRConfig.invokePath, {
      images: [
        {
          format,
          data: getImageToBase64(join(__dirname, '../', localFilePath)),
          name: filename,
        },
      ],
      requestId,
      timestamp,
      version: 'V2',
    });

    return data;
  }
}

module.exports = TextOCR;
