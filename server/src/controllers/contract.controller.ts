import multer from 'multer';
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      return cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Only .pdf format allowed!'));
    }
  },
}).single('contract');
