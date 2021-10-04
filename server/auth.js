const { users } = require("./models");

const crypto = global.crypto;
const session = global.session;
const ConnectMongo = global.ConnectMongo

module.exports = (app, models, dbCloudUrl) => {
  Object.defineProperty(exports,"__esModule",{value:true});
  const User = models['users']
  const salt = '6cakeis78delicous';
  // session middleware
  app.use(session({
    secret: '67yuwn89236', // choose your own...
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: ConnectMongo.create({ mongoUrl: dbCloudUrl })
  }));


  // Route to register a user
  app.post('/api/users', async (req, res) => {
    // Encrypt password
    const duplicateEmail = await models['users'].find({ email: req.body.email })

    if (duplicateEmail.length > 0) {
      res.json({ error: 'Email already in use' });
      return;
    }

    const hash = crypto.createHmac('sha256', salt)
      .update(req.body.password).digest('hex');
    console.log("hash",hash)
    // Create new user
    let user = new models['users']({ ...req.body, password: hash });
    await user.save();
    res.json(user);
  });

  // get users
  app.get('/api/users', async(req, res) => {
    let users = await models['users'];
    let data = await users.find();
    res.json(data);
  });
  
  // Login

  app.post('/api/login', async (req, res) => {
    // note: req.session is unique per user/browser
    if(req.session.user) {
      delete req.session.user;
      res.json({error: 'Someone is already logged in'});
      return;
    }
    
    // Encrypt password

    let password = req.body.password
    
    const hash = crypto.createHmac('sha256', salt)
    .update(req.body.password).digest('hex');
    // Search for user
    /* let user = await User.find({ $and: [{ email: req.body.email }, { password: hash }] }) */
    let user = await User.findOne({email: req.body.email, password: hash})
    console.log(user);
    if(user) {
      req.session.user = user;
      res.json(user);
    } else {
      res.json({error: 'No match found'});
    }
  });

  // Logout
  app.delete('/api/login', (req, res) => {
    console.log("session", req.session.user);
    if (req.session.user) {
      delete req.session.user;
      res.json({ success: 'Logged out' });
      console.log("Logged out");
    }
    else {
      res.json({ error: 'Was not logged in' });
    }
  });


  //get users
  /* app.get('/api/users',async (req,res) =>{
    let docs = await users.find()
    res.json(docs)
  }) */
  
  // Check if logged in
  app.get('/api/login', (req, res) => {
    if (req.session.user !== undefined) {
      
      res.json(req.session.user);
    } else {
      res.json({ error: 'Not logged in' });
    }
  });
}