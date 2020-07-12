import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpfolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: tmpfolder,
  storage: multer.diskStorage({
    destination: tmpfolder,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
