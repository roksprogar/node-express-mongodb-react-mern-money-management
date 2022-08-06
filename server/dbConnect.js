const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONN);

const connection = mongoose.connection;

connection.on('error', (err) => console.log(err));

connection.on('connected', () =>
  console.log('Mongo DB Connection Successful!')
);
