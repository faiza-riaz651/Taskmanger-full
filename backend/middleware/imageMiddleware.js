import multer from "multer";
import path from "node:path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /.png|.jpeg|jpg/;
  const accept = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (accept) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
export const upload = multer({
  storage: storage,
  fileFilter,
});
