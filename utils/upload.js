'use strict';

import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, 'public/uploads');
  },

  filename(request, file, callback) {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter(request, file, callback) {
    if (!file.mimetype.startsWith('image/')) {
      callback(new Error('Only image uploads are allowed.'));
      return;
    }
    callback(null, true);
  },
});

export function uploadedPath(file) {
  return file ? `/uploads/${file.filename}` : null;
}

export default upload;
