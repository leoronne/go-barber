import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import uploadConfig from '@config/upload';

import { AWS_S3_BUCKET, AWS_DEFAULT_REGION } from '@shared/utils/environment';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: String(AWS_DEFAULT_REGION),
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpfolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: null,
    });

    const fileType = mime.getType(originalPath);

    if (!fileType) {
      throw new AppError('File does not exists', 500);
    }

    await this.client
      .putObject({
        Bucket: String(AWS_S3_BUCKET),
        Key: file,
        ACL: 'public-read',
        ContentType: fileType,
        Body: fileContent,
        ContentDisposition: `inline; filename${file}`,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: String(AWS_S3_BUCKET),
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
