const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB not connected");
  });

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// my Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const groupRoute = require("./routes/group");


//my routes (middleware)
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", groupRoute);

//port setup
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
