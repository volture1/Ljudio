const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const { sequelize } = require("./models.js");
const models = require("./models.js");

const app = express();
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

const auth = require("./auth.js");
const rest = require("./rest.js");

// Initialize database and start server
async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");

    rest(app, models);
    auth(app, models);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
