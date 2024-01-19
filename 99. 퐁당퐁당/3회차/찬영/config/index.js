const { readFileSync } = require('fs');
const { join } = require('path');
const yaml = require('js-yaml');

module.exports = yaml.load(readFileSync(join(__dirname, 'config.yml'), 'utf8'));
