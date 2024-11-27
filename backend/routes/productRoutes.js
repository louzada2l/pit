// productRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");  // Certifique-se de que isso é um middleware (função)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

const router = express.Router();

router.post("/", authMiddleware.protect, upload.single("image"), productController.createProduct);
router.get("/", authMiddleware.protect, productController.getProducts);
router.put("/:id", authMiddleware.protect, upload.single("image"), productController.updateProduct);
router.delete("/:id", authMiddleware.protect, productController.deleteProduct);

module.exports = router;
