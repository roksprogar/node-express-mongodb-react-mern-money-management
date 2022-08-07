import { message, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import '../resources/transactions.css';

function Home() {
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('pmm-user'));
      const response = await axios.post(
        '/api/transactions/get-all-transactions',
        { userid: user._id }
      );
      setTransactionsData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center">
        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analytics">
        <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div>
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
