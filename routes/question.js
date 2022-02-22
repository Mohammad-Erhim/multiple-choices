const express = require("express");
const { body } = require("express-validator");

const questionController = require("../controllers/question");

const isAuth = require("../middleware/is-auth");
const router = express.Router();
router.post(
  "/question",
  isAuth,
  [
    body("question", "Please enter a text between 1 to 500 characters.")
      .isLength({ min: 1, max: 500 })
      .trim(),
    body("answer", "Please enter a text between 1 to 500 characters.")
      .isLength({ min: 1, max: 500 })
      .trim(),
  ],
  questionController.addQuestion
);
router.post(
  "/question/:id/answer",
  isAuth,
  [
   
    body("answerRef", "Please enter a text between 1 to 500 characters.")
      .isLength({ min: 1, max: 500 })
      .trim(),
  ],
  questionController.answer
);
router.get("/questions", isAuth, questionController.questions);

module.exports = router;
