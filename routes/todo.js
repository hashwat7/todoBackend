const { todo } = require("../db/db");
const { createTodo, updateTodo } = require("../validations/types");
const { Router } = require("express");
const router = Router();
//body
// {
//   title: string;
//   description: string;
// }
router.post("/todo", async (req, res) => {
  const payLoad = req.body;
  const parsedPayLoad = createTodo.safeParse(payLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({ msg: "You have sent the wrong inputs" });
    return;
  } else {
    await todo.create({
      title: payLoad.title,
      description: payLoad.description,
      completed: false,
    });
    res.json({ msg: "Todo Created" });
  }
});

router.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({ todos: todos });
});

router.put("/completed", async (req, res) => {
  const payLoad = req.body;
  const parsedPayLoad = updateTodo.safeParse(payLoad);
  if (!parsedPayLoad.success) {
    res.status(411).json({ msg: "You have sent the wrong input" });
    return;
  }
  await todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  setTimeout(async () => {
    await todo.deleteOne({ _id: req.body.id });
  }, 2000);
  res.json({ msg: "Todo marked as true" });
});

module.exports = router;
