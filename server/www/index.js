// Start an express server
// that serves all files in the folder www
const express = require('express');
const app = express();
app.use(express.static('www'));
app.listen(3000, () => console.log('Listening on port 3000.'));

// Use mongoose
const mongoose = require('mongoose');

// Connect to the mongo database lundacats
mongoose.connect(
  'mongodb://localhost:27017/lundacats', {
  // let me speak the same dialect
  // as a modern MongoDB server:
  useNewUrlParser: true,
  useUnifiedTopology: true
});

