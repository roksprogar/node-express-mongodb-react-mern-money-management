import { DatePicker, message, Select, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import Analytics from '../components/Analytics';
import '../resources/transactions.css';
import {
  EditOutlined,
  DeleteOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
const { RangePicker } = DatePicker;

function Home() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactionForEdit, setSelectedTransactionForEdit] =
    useState(false);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(null);
  const [frequency, setFrequency] = useState('7');
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState('all');
  const [viewType, setViewType] = useState('table');

  const getTransactions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('pmm-user'));
      const response = await axios.post(
        '/api/transactions/get-all-transactions',
        {
          userid: user._id,
          frequency: frequency,
          ...(frequency === 'custom' && { selectedRange }),
          type: type,
        }
      );
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
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
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedTransactionForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutlined className="mx-3" />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Date range</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 7 days</Select.Option>
              <Select.Option value="30">Last 30 days</Select.Option>
              <Select.Option value="365">Last 365 days</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column mx-5">
            <h6>Transaction type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div className="view-switch mx-5">
            <UnorderedListOutlined
              className={`${
                viewType === 'table' ? 'active-icon' : 'inactive-icon'
              } mr-3`}
              onClick={() => setViewType('table')}
            />
            <AreaChartOutlined
              className={`${
                viewType !== 'table' ? 'active-icon' : 'inactive-icon'
              }`}
              onClick={() => setViewType('analytics')}
            />
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>

      <div className="table-analytics">
        {viewType === 'table' ? (
          <div className="table">
            <Table columns={columns} dataSource={transactions} rowKey="_id" />
          </div>
        ) : (
          <Analytics transactions={transactions} />
        )}
      </div>

      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          selectedTransactionForEdit={selectedTransactionForEdit}
          setSelectedTransactionForEdit={setSelectedTransactionForEdit}
          getTransactions={getTransactions}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
