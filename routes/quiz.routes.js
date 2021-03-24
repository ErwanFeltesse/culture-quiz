const router = require("express").Router();
const quizController = require("../controllers/quiz.controller");
const multer = require("multer");
const upload = multer();

router.get("/", quizController.readQuiz);
router.post("/",upload.single("file"), quizController.createQuiz);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;