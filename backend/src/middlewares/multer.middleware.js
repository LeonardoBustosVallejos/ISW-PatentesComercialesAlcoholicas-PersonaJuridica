const multer = require('multer');

function fileFilter(req, file, cb) {
    if (file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' || 
        file.mimetype == 'application/pdf' ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Solo se aceptan archivos .png, .jpg, .jpeg, .pdf'))
    }
}

const storage = multer.diskStorage({
    destination: '../uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
    filename: function(req, file, cb){
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
    });

const maxSize = 100 * 1024 * 1024; // 50MB

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: maxSize
  } });

module.exports = upload;

