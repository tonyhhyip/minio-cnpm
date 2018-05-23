/*!
 * minio-cnpm - index.js
 *
 * Copyright(c) 2018 Tony Yip.
 * MIT Licensed
 */

const fs = require('fs');
const minio = require('minio');

class MinioNFS {
  constructor(bucket, options) {
    this.bucket = bucket;
    this.client = new minio.Client(options);
  }

  upload(filepath, options) {
    return this.uploadBuffer(fs.createReadStream(filepath), options);
  }

  uploadBuffer(buffer, { key, size }) {
    return this.client.putObject(this.bucket, key, buffer, size)
      .then(() => ({ key }));
  }

  remove(key) {
    return this.client.removeObject(this.bucket, key);
  }

  downalod(key, savePath) {
    return this.client.fGetObject(this.bucket, key, savePath);
  }

  createDownloadStream(key) {
    return this.client.getObject(this.bucket, key);
  }

  url(key) {
    return this.client.presignedGetObject(this.bucket, key, 3600);
  }
}

module.exports = MinioNFS;

