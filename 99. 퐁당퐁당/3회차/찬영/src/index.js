const TextOCR = require('./text-ocr');

(async () => {
  const textOCR = new TextOCR();

  const result = await textOCR.request('/assets/sample.jpeg');
  console.log(JSON.stringify(result));
})();
