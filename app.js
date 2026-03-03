const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

//Router Posts
const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log("App listening");
});
