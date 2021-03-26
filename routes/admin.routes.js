const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logout);

// admin display
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.adminInfo);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
