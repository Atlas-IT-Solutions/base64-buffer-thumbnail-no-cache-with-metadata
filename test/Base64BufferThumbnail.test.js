'use strict';

const fs = require('fs')
const sizeOf = require('image-size');
const Base64BufferThumbnail = require('../src');
const fixtures = require('./test_data');
const util = require('../src/util');

describe('Image Thumbnail', () => {
    describe('Thumbnail Buffer', () => {
        it('should return a buffer image thumbnail from an image base64', async () => {
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64);

            expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromBase64);
        });

        it('should return a buffer image thumbnail from a buffer', async () => {
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data)
            const thumbnail = await Base64BufferThumbnail(bufferOriginal);
            expect(thumbnail.toJSON()).toEqual(fixtures.thumbnailBufferFromBuffer);
        });
    });

    describe('Thumbnail Base64', () => {

        it('should return a base64 image thumbnail from a base64 image', async () => {
            const options = {
                responseType: 'base64'
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            expect(thumbnail).toEqual(fixtures.thumbnailBase64FromBase64);
        });

        it('should return a base64 image thumbnail from a buffer', async () => {
            const options = {
                responseType: 'base64'
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data)
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            expect(thumbnail).toEqual(fixtures.thumbnailBase64FromBuffer);
        });
    });

    describe('Base64 with Options', () => {
        it('should return a buffer image and keep aspect 300x200', async () => {
            const options = {
                width: 300,
                height: 200
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 300', async () => {
            const options = {
                width: 300
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(188);

        });

        it('should return a buffer image with height equals 300', async () => {
            const options = {
                height: 300
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(480);
            expect(dimensions.height).toEqual(300);

        });

        it('should return a buffer image with width equals 300 and height equals 200', async () => {
            const options = {
                width: 300,
                height: 200
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 200', async () => {
            const options = {
                height: 200
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(320);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 144 and height equals 96', async () => {
            const options = {
                percentage: 15
            };
            const thumbnail = await Base64BufferThumbnail(fixtures.imageBase64, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(96);
            expect(dimensions.height).toEqual(60);
        });
    });

    describe('Buffer with Options', () => {
        it('should return a buffer image and keep aspect 300x200', async () => {
            const options = {
                width: 300,
                height: 200
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 300', async () => {
            const options = {
                width: 300
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(188);

        });

        it('should return a buffer image with height equals 300', async () => {
            const options = {
                height: 300
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(480);
            expect(dimensions.height).toEqual(300);

        });

        it('should return a buffer image with width equals 300 and height equals 200', async () => {
            const options = {
                width: 300,
                height: 200
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(300);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 200', async () => {
            const options = {
                height: 200
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(320);
            expect(dimensions.height).toEqual(200);
        });

        it('should return a buffer image with width equals 144 and height equals 96', async () => {
            const options = {
                percentage: 15
            };
            const bufferData = JSON.parse(JSON.stringify(fixtures.imageBuffer));
            const bufferOriginal = Buffer.from(bufferData.data);
            const thumbnail = await Base64BufferThumbnail(bufferOriginal, options);
            const dimensions = sizeOf(thumbnail);

            expect(dimensions.width).toEqual(192);
            expect(dimensions.height).toEqual(120);
        });
    });

    describe('Utils', () => {
        describe('RemoveUndefined', () => {
            it('should return an object only with height', async () => {
                const originalObject = {
                    width: undefined,
                    height: 200
                };

                const newObject = util.removeUndefined(originalObject)

                expect(newObject).toEqual({
                    height: 200
                });
            });

            it('should return an object only with width', async () => {
                const originalObject = {
                    width: 200,
                    height: undefined
                };

                const newObject = util.removeUndefined(originalObject)

                expect(newObject).toEqual({
                    width: 200
                });

            });

            it('should return an object with width and height', async () => {
                const originalObject = {
                    width: 200,
                    height: 200
                };

                const newObject = util.removeUndefined(originalObject)

                expect(newObject).toEqual(originalObject);

            });
        });
    });
});