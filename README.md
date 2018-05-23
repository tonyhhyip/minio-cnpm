# minio-cdn-cnpm

minio wrapper for cnpmjs.org with CDN 

## Install

```bash
yarn add minio-cdn-cnpm
```

## Usage

```javascript
const Minio = require('minio-cdn-cnpm');

const minioCnpm =  new Minio(bucket, {
  endPoint: 'play.minio.io',
  port: 9000,
  secure: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});
```

## API

- constructor(bucketName, minioOptions, cdnOptions)
    - bucketName: Name of bucket
    - minioOptions: option for connect to minio, please refers to [Minio Document](https://docs.minio.io/docs/javascript-client-api-reference#MinioClient_endpoint)
    - cdnOptions:
        - hostname: hostname for public access
        - inSecure (boolean): allow to use http (default: false)
