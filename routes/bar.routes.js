const router = require("express").Router();
const barController = require("../controllers/bar.controller");
const multer = require("multer");
const upload = multer();

router.get("/", barController.readBar);
router.post("/",upload.single("file"), barController.createBar);
router.put("/:id", barController.updateBar);
router.delete("/:id", barController.deleteBar);

module.exports = router;