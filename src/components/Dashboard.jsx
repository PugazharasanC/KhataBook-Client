// src/components/Dashboard.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import { fetchBalance } from "../store/transactionSlice"; // AsyncThunk for fetching balance

const Dashboard = () => {
  const dispatch = useDispatch();

  // Getting the balance data from Redux store
  const { balance, status, error } = useSelector((state) => state.transactions);

  // Fetch balance data on component mount
  useEffect(() => {
    dispatch(fetchBalance()); // Dispatch the asyncThunk to fetch balance
  }, [dispatch]);

  // Handle loading and error states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Transaction Form */}
      <TransactionForm />

      {/* Balance Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Income Column */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Income</h2>
          <p className="text-2xl font-bold text-green-600">
            ${balance.income || 0}
          </p>
        </div>

        {/* Expense Column */}
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">
            ${balance.expense || 0}
          </p>
        </div>

        {/* Current Balance Column */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Current Balance</h2>
          <p className="text-2xl font-bold text-blue-600">
            ${balance.currentBalance}
          </p>
        </div>

        {/* Loan Balance Column */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Loan Balance</h2>
          <p className="text-2xl font-bold text-yellow-600">
            ${balance.loanBalance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
