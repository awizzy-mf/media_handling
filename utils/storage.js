const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },

  filename: (req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
  },
});

module.exports = {
  image: multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        callback(null, true);
      } else {
        // return error
        const errMessage = new Error ("only png, jpg, and jpeg allowed to upload!");
        callback(errMessage, false);
      }
    },
    onError: (err, next) => {
      next(err)
    },
  }),
};
