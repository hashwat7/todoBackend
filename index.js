const express = require("express");
const app = express();
const router = require("./routes/todo");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
