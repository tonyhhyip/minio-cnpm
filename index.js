/*!
 * minio-cdn-cnpm - index.js
 *
 * Copyright(c) 2018 Tony Yip.
 * MIT Licensed
 */

const { URL } = require('url');
const { Client } = require('minio');

class MinioNFS {
  constructor(bucket, minioOption, cdnOpt) {
    this.bucket = bucket;
    this.client = new Client(minioOption);
    this.cdnOpt = cdnOpt;
  }

  upload(filepath, { key }) {
    return this.client.fPutObject(this.bucket, key, filepath)
      .then(() => ({ key }));
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
    return this.client.presignedGetObject(this.bucket, key, 3600)
      .then((presigned) => {
        const u = new URL(presigned);
        u.protocol = this.cdnOpt.inSecure ? 'http:' : 'https:';
        u.host = this.cdnOpt.hostname;
      });
  }
}

module.exports = MinioNFS;

