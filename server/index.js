const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const userRouter = require("./routers/users");
const blogRouter = require("./routers/blog");
const dev = process.env.NODE_ENV !== "production";
const mongoose = require("mongoose");
const app = next({ dev });

const handle = app.getRequestHandler();
mongoose
  .connect(
    "mongodb+srv://vivekkn91:Y4k9BlTg7WrkGDkz@cluster0.mmld4hx.mongodb.net/blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  // Parse incoming JSON requests

  // Custom Middleware
  server.use((req, res, next) => {
    console.log("This is a custom middleware");
    next();
  });

  // API routes
  server.use("/", userRouter);
  server.use("/", blogRouter);

  // Handle other Next.js routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
