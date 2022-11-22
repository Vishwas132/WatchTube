import multer from "multer";
import crypto from "crypto";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  const extArr = [
    "mp4",
    "mov",
    "wmv",
    "avi",
    "MPEG-1",
    "MPEG-2",
    "MPEG4",
    "flv",
    "3gpp",
    "webm",
    "DNxHR",
    "ProRes",
    "CineForm",
    "HEVC",
    "MPEGPS",
    "MPG",
  ];
  if (extArr.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Not a video File!!"), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export default upload;
