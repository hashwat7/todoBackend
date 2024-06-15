const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://new-user-69:Qwerty120@cluster0.yj9y1ft.mongodb.net/"
);

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("Todos", TodoSchema);

module.exports = { todo };
