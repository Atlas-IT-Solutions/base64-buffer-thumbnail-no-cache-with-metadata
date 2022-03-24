# About

Generate an image thumbnail using base64 and buffers only! with no cache
fork from https://www.npmjs.com/package/base64-buffer-thumbnail

## Purpose?

This module will generate an image thumbnail.

By default the thumbnail's file format will be the same than the source file. You can use the **jpegOptions** option to force output to jpeg.

## Usage

### Base64BufferThumbnail(source, options)

#### Async/Await (Typescript & ES7)

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

try {
  const thumbnail = await Base64BufferThumbnail(
    "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA=="
  );
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

#### Using promises (node 8.x)

```js
const Base64BufferThumbnail = require('base64-buffer-thumbnail-no-cache');

Base64BufferThumbnail(('/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA==')
    .then(thumbnail => { console.log(thumbnail) })
    .catch(err => console.error(err));
```

## Examples

#### From Base64

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

try {
  const thumbnail = await Base64BufferThumbnail(
    "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA=="
  );
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

#### From Buffer

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

try {
  const imageBuffer = fs.readFileSync("resources/images/valais.jpg");

  const thumbnail = await Base64BufferThumbnail(imageBuffer);
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

## Options

- **options:**
  - **percentage** [0-100] - image thumbnail percentage. Default = 10
  - **width** [number] - image thumbnail width.
  - **height** [number] - image thumbnail height.
  - **responseType** ['buffer' || 'base64'] - response output type. Default = 'buffer'
  - **jpegOptions** [0-100] - Example: { force:true, quality:100 }
  - **fit** [string] - method by which the image should fit the width/height. Default = contain ([details](https://sharp.pixelplumbing.com/api-resize))

### Examples

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

let options = {percentage: 25, responseType: "base64"};

try {
  const thumbnail = await Base64BufferThumbnail(
    "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA==",
    options
  );
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

let options = {width: 100, height: 100, responseType: "base64"};

try {
  const thumbnail = await Base64BufferThumbnail(
    "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA==",
    options
  );
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

```js
const Base64BufferThumbnail = require("base64-buffer-thumbnail-no-cache");

let options = {
  width: 100,
  height: 100,
  responseType: "base64",
  jpegOptions: {force: true, quality: 90},
};

try {
  const thumbnail = await Base64BufferThumbnail(
    "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QEERXhpZgAA==",
    options
  );
  console.log(thumbnail);
} catch (err) {
  console.error(err);
}
```

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.
