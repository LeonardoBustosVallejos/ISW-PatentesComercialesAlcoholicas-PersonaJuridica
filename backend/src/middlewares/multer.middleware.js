const multer = require('multer');

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
}

const storage = multer.diskStorage({
    destination: '../uploads/',
    filename: function (_req, file, cb) {
      cb(null, file.originalname);
    }
    }
);

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  } });

module.exports = upload;

