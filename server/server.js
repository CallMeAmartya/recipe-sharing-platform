require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//Connect to MongoDB database
mongoose
  .connect("mongodb://localhost/myapp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB database: ", e);
  });

// Parse JSON request bodies
app.use(express.json());
app.use(cors());

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/users", require("./routes/users"));

// Start the server
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
