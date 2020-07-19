import { STORAGE_DRIVER } from '@shared/utils/environment';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IStorageConfig {
  driver: 's3' | 'disk';
  tmpfolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpfolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  driver: STORAGE_DRIVER,
  tmpfolder,
  uploadsFolder: path.resolve(tmpfolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpfolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
} as IStorageConfig;
