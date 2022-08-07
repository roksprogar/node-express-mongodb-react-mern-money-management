import React, { useState } from 'react';
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

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
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
