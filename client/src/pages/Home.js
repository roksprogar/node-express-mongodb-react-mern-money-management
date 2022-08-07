import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  const handleModalOk = () => {
    setShowAddEditTransactionModal(false);
  };

  const handleModalCancel = () => {
    setShowAddEditTransactionModal(false);
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
        <div></div>
        <div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics"></div>
      <Modal
        title="Add transaction"
        visible={showAddEditTransactionModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={false}
      >
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
    </DefaultLayout>
  );
}

export default Home;
