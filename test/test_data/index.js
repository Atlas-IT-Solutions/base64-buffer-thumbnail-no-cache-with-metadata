'use strict';

const imageBase64 = require('./imageBase64.json').base64;
const imageBuffer = require('./imageBuffer.json').buffer;
const thumbnailBufferFromBase64 = require('./thumbnailBufferFromBase64.json').buffer;
const thumbnailBufferFromBuffer = require('./thumbnailBufferFromBuffer.json').buffer;
const thumbnailBase64FromBase64 = require('./thumbnailBase64FromBase64.json').base64;
const thumbnailBase64FromBuffer = require('./thumbnailBase64FromBuffer.json').base64;
const unsupportedSourceType = 'Error: unsupported source type'

module.exports = {
    imageBase64,
    imageBuffer,
    thumbnailBufferFromBase64,
    thumbnailBufferFromBuffer,
    thumbnailBase64FromBase64,
    thumbnailBase64FromBuffer,
    unsupportedSourceType
};