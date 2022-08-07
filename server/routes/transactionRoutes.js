const express = require('express');
const Transaction = require('../models/Transaction');
const moment = require('moment');

const router = express.Router();

router.post('/add-transaction', async (req, res) => {
  try {
    let newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send('Transaction Added Successfully!');
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/get-all-transactions', async (req, res) => {
  try {
    const { frequency, selectedRange, type } = req.body;
    const transactions = await Transaction.find({
      userid: req.body.userid,
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      ...(type !== 'all' && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
