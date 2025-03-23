const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'qr_code')
    }
});

module.exports = multer({storage: storage}).single();
