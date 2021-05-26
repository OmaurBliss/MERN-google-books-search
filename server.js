const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/apiRoutes");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
}

// API routes
app.use("/api", routes);

// Mongo DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {useUnifiedTopology: true, useNewUrlParser: true});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
