import { Form, Input, message, Modal, Select } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTransaction({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);

  const handleModalCancel = () => {
    setShowAddEditTransactionModal(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('pmm-user'));
      axios.post('/api/transactions/add-transaction', {
        ...values,
        userid: user._id,
      });
      getTransactions();
      setLoading(false);
      message.success('Transaction added!');
      setShowAddEditTransactionModal(false);
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong!');
    }
  };
  return (
    <Modal
      title="Add transaction"
      visible={showAddEditTransactionModal}
      onCancel={handleModalCancel}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={handleFormSubmit}
      >
        <Form.Item label="Amount" name="amount">
          <Input type="text"></Input>
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
