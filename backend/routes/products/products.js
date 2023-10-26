const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  sellProducts,
  getProducts,
  deleteProducts,
} = require("../../controllers/products/productsControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/products", upload.single("file"), sellProducts);
router.get("/products", getProducts);
router.delete("/products", deleteProducts);

module.exports = router;
