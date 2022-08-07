require('dotenv').config();

const express = require('express');
const dbConnect = require('./dbConnect');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('client/build'));

  app.get('*', (res, req) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => console.log(`Example app listeninng on port ${port}!`));
