const express = require("express");
const app = express();
const port = 3000;
const notFoundError = require("./middlewares/notFoundError.js");

//Middlewares
app.use(express.static("public"));
app.use(express.json());

//Router Posts
const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

app.use(notFoundError);

app.listen(port, () => {
  console.log("App listening");
});
