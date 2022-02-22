const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
   
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answerRef: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
      
    },
  },

  {
    timestamps: true,
   
  }
);


module.exports = mongoose.model("Question", questionSchema);
