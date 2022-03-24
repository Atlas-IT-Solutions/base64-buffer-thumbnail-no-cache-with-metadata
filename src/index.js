'use strict';

const sizeOf = require('image-size');
const sharp = require('sharp');
sharp.cache(false)
const validator = require('validator');
const util = require('./util');

const PERCENTAGE = 10;
const RESPONSE_TYPE = 'buffer';

const fromBase64 = async (source, percentage, width, height, responseType, jpegOptions, fit) => {
    const imageBuffer = Buffer.from(source, 'base64');
    const dimensions = getDimensions(imageBuffer, percentage, {
        width,
        height
    });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions, fit);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }

    return thumbnailBuffer;
};

const fromBuffer = async (source, percentage, width, height, responseType, jpegOptions, fit) => {
    const imageBuffer = source;

    const dimensions = getDimensions(imageBuffer, percentage, {
        width,
        height
    });
    const thumbnailBuffer = await sharpResize(imageBuffer, dimensions, jpegOptions, fit);

    if (responseType === 'base64') {
        return thumbnailBuffer.toString('base64');
    }


    return thumbnailBuffer;
};

module.exports = async (source, options) => {
    const percentage = options && options.percentage ? options.percentage : PERCENTAGE;
    const width = options && options.width ? options.width : undefined;
    const height = options && options.height ? options.height : undefined;
    const responseType = options && options.responseType ? options.responseType : RESPONSE_TYPE;
    const jpegOptions = options && options.jpegOptions ? options.jpegOptions : undefined;
    const fit = options && options.fit ? options.fit : undefined;

    try {
        switch (typeof source) {
            case 'object':
                let response;
                if (source instanceof Buffer) {
                    response = await fromBuffer(source, percentage, width, height, responseType, jpegOptions, fit);
                }

                return response;
            case 'string':
                if (validator.isBase64(source)) {
                    return await fromBase64(source, percentage, width, height, responseType, jpegOptions, fit);
                }
            default:
                throw new Error('unsupported source type');
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const getDimensions = (imageBuffer, percentageOfImage, dimensions) => {
    if (typeof dimensions.width != 'undefined' || typeof dimensions.height != 'undefined') {
        return util.removeUndefined(dimensions);
    }

    const originalDimensions = sizeOf(imageBuffer);

    const width = parseInt((originalDimensions.width * (percentageOfImage / 100)).toFixed(0));
    const height = parseInt((originalDimensions.height * (percentageOfImage / 100)).toFixed(0));

    return {
        width,
        height
    };
}

const sharpResize = (imageBuffer, dimensions, jpegOptions, fit) => {
    return new Promise((resolve, reject) => {
        sharp(imageBuffer)
            .resize({
                ...dimensions,
                withoutEnlargement: true,
                fit: fit ? fit : 'contain',
            })
            .jpeg(jpegOptions ? jpegOptions : {
                force: false
            })
            .toBuffer((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
};