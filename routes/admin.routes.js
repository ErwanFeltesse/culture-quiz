const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");


//auth
router.post("/register", authController.signUp);


// admin display
router.get("/", adminController.getAllAdmins)
router.get("/:id", adminController.adminInfo)
router.put("/:id", adminController.updateAdmin)
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
