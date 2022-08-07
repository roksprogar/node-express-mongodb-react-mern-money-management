require('dotenv').config();

const express = require('express');
const dbConnect = require('./dbConnect');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => console.log(`Example app listeninng on port ${port}!`));
