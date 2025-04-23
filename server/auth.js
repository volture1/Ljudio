const { users } = require("./models");

const crypto = global.crypto;
const session = global.session;
const ConnectMongo = global.ConnectMongo;

module.exports = (app, models, dbCloudUrl) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  const User = models.users;
  const salt = "6cakeis78delicous";
  // session middleware
  app.use(
    session({
      secret: "67yuwn89236", // choose your own...
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      store: ConnectMongo.create({ mongoUrl: dbCloudUrl }),
    })
  );

  // Route to register a user
  app.post("/api/users", async (req, res) => {
    try {
      // Check for duplicate email
      const duplicateEmail = await User.findOne({
        where: { email: req.body.email },
      });

      if (duplicateEmail) {
        res.json({ error: "Email already in use" });
        return;
      }

      // Encrypt password
      const hash = require("crypto")
        .createHmac("sha256", salt)
        .update(req.body.password)
        .digest("hex");

      // Create new user
      const user = await User.create({
        ...req.body,
        password: hash,
      });

      res.json(user);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // get users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // Login
  app.post("/api/login", async (req, res) => {
    try {
      // Check if already logged in
      if (req.session.user) {
        delete req.session.user;
        res.json({ error: "Someone is already logged in" });
        return;
      }

      // Encrypt password for comparison
      const hash = require("crypto")
        .createHmac("sha256", salt)
        .update(req.body.password)
        .digest("hex");

      // Find user
      const user = await User.findOne({
        where: {
          email: req.body.email,
          password: hash,
        },
      });

      if (user) {
        req.session.user = user;
        res.json(user);
      } else {
        res.json({ error: "No match found" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Logout
  app.delete("/api/login", (req, res) => {
    if (req.session.user) {
      delete req.session.user;
      res.json({ success: "Logged out" });
    } else {
      res.json({ error: "Was not logged in" });
    }
  });

  // Check if logged in
  app.get("/api/login", (req, res) => {
    if (req.session.user !== undefined) {
      res.json(req.session.user);
    } else {
      res.json({ error: "Not logged in" });
    }
  });
};
