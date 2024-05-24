const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCtrl = require("../../controllers/api/upload");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/avatar", uploadCtrl.getAvatarUrl);
router.post("/upload", upload.single("file"), uploadCtrl.uploadAvatar);

module.exports = router;
