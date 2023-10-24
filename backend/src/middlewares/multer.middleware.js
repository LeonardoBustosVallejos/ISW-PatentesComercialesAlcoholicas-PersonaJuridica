//

const multer = require('multer');

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
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
  });

  const upload = multer({ storage: storage });

  module.exports = upload;