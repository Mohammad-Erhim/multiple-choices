const { validationResult } = require("express-validator");
const { Types } = require("mongoose");
const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");
const filteredArr = (arr, key = (it) => it._id.toString()) => {
  return [...new Map(arr.map((x) => [key(x), x])).values()];
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

exports.questions = async (req, res, next) => {
  const userRef = req.user._id;

  const skip = +req.query.skip || 0;

  try {
    const question = await Question.findOne({
      userRef: Types.ObjectId(userRef),
    }).skip(skip);

    if (!question) return res.status(404).json({ message: "Not found." });
    const answer = await Answer.findById(Types.ObjectId(question.answerRef));

    const count = await Answer.count();
    const random = Math.floor(Math.random() * count);

    let options = (
      await Promise.all(
        [1, 2, 3, 4].map(async (element, index) => {
          return await Answer.findOne({
            userRef: Types.ObjectId(userRef),
          }).skip(random);
        })
      )
    ).filter((i) => i);

  
    if (answer) options.push(answer);

    if (options.length) {
      options = shuffle(filteredArr(options));
    }

    res.status(200).json({ question, options });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addQuestion = async (req, res, next) => {
  const questionText = req.body.question;
  const answerText = req.body.answer;

  const user = req.user;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 400;
      error.data = errors.array();
      throw error;
    }
    const answer = new Answer({
      text: answerText,
      userRef: user,
    });

    await answer.save();

    const question = new Question({
      text: questionText,
      userRef: user,
      answerRef: answer,
    });

    await question.save();

    res.status(201).json({ message: "Question created.", question });
  } catch (err) {
    next(err);
  }
};

exports.answer = async (req, res, next) => {
  const questionId = req.params.id;
  const answerRef = req.body.answerRef;

  let user = req.user;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 400;
      error.data = errors.array();
      throw error;
    }

    const question = await Question.findById(Types.ObjectId(questionId));
    const answer = await Answer.findById(Types.ObjectId(question.answerRef));

    if (answer._id.toString() === answerRef)
      user = await User.findOneAndUpdate(
        { _id: Types.ObjectId(user._id) },
        { $inc: { success: 1 } },
        { returnOriginal: false }
      );
    else
      user = await User.findOneAndUpdate(
        { _id: Types.ObjectId(user._id) },
        { $inc: { fail: 1 } },
        { returnOriginal: false }
      );
    res
      .status(201)
      .json({ message: "Question created.", question, answer, user });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
