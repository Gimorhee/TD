const express = require("express");
const connectDB = require("./config/db.js");
const app = express();
const path = require("path");

// Connect Database
connectDB();

// Init Middleware (BodyParser)
app.use(express.json({ extended: false }));

// Defined Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/petProfile", require("./routes/api/petProfile"));
app.use("/api/posts", require("./routes/api/posts"));

// Serve static assets in production
if (process.env.node_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
