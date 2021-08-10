const express = require("express");
const connectDB = require("./config/db.js");
const app = express();

// Connect Database
connectDB();

// Init Middleware (BodyParser)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// Defined Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/petProfile", require("./routes/api/petProfile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
