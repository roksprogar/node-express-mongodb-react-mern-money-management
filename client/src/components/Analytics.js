import React from 'react';
import '../resources/analytics.css';
import { Progress } from 'antd';

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income'
  );
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = transactions.reduce(
    (runningSum, transaction) => runningSum + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions.reduce(
    (runningSum, transaction) =>
      runningSum + (transaction.type === 'income' ? transaction.amount : 0),
    0
  );
  const totalExpenseTurnover = transactions.reduce(
    (runningSum, transaction) =>
      runningSum + (transaction.type === 'expense' ? transaction.amount : 0),
    0
  );
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    'salary',
    'freelance',
    'food',
    'entertainment',
    'investment',
    'travel',
    'education',
    'medical',
    'tax',
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total transactions: {totalTransactions}</h4>
            <hr />
            <h5>Income: {totalIncomeTransactions.length}</h5>
            <h5>Expense: {totalExpenseTransactions.length}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
                strokeColor="#5dd64f"
              />
              <Progress
                type="circle"
                percent={totalExpenseTransactionsPercentage.toFixed(0)}
                strokeColor="#e5572f"
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total turnover: {totalTurnover}</h4>
            <hr />
            <h5>Income: {totalIncomeTurnover}</h5>
            <h5>Expense: {totalExpenseTurnover}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
                strokeColor="#5dd64f"
              />
              <Progress
                type="circle"
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
                strokeColor="#e5572f"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category breakdown</h4>
            {categories.map((category) => {
              let amount = transactions
                .filter((t) => t.type === 'income' && t.category === category)
                .reduce((s, t) => s + t.amount, 0);
              let percent = ((amount / totalIncomeTurnover) * 100).toFixed(0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress percent={percent} strokeColor="#5dd64f" />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - Category breakdown</h4>
            {categories.map((category) => {
              let amount = transactions
                .filter((t) => t.type === 'expense' && t.category === category)
                .reduce((s, t) => s + t.amount, 0);
              let percent = ((amount / totalExpenseTurnover) * 100).toFixed(0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress percent={percent} strokeColor="#e5572f" />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
