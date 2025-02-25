// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import { fetchBalance, fetchTransactions } from "../store/transactionSlice"; // Fetch transactions

const categories = {
  income: ["salary", "freelance", "gift", "investment"],
  expense: ["groceries", "entertainment", "utilities", "rent"],
  loan: ["personal loan", "mortgage", "education loan", "car loan"],
  loan_repayment: ["personal loan", "mortgage", "education loan", "car loan"],
};

const Dashboard = () => {
  const dispatch = useDispatch();

  // Getting the balance and transactions data from Redux store
  const { balance, transactions, status, error } = useSelector(
    (state) => state.transactions
  );

  // State for filtering
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Fetch balance and transactions data on component mount
  useEffect(() => {
    dispatch(fetchBalance()); // Dispatch to fetch balance
    dispatch(fetchTransactions()); // Dispatch to fetch transactions
  }, [dispatch]);

  useEffect(() => {
    // Filter transactions based on selected category and type
    let filtered = transactions;

    if (typeFilter) {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    setFilteredTransactions(filtered);
  }, [categoryFilter, typeFilter, transactions]);

  // Handle loading and error states
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {JSON.stringify(error)}</div>;
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

      {/* Filters */}
      <div className="mt-6 flex justify-between">
        <select
          className="p-2 border rounded"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="loan">Loan</option>
          <option value="loan_repayment">Loan Repayment</option>
        </select>

        <select
          className="p-2 border rounded"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          disabled={!typeFilter} // Disable category filter until type is selected
        >
          <option value="">All Categories</option>
          {typeFilter &&
            categories[typeFilter].map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
                {/* Capitalize category name */}
              </option>
            ))}
        </select>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {filteredTransactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          <ul className="space-y-4">
            {filteredTransactions.slice(0, 5).map((transaction) => {
              const isIncomeOrLoan =
                transaction.type === "income" || transaction.type === "loan";
              const isExpenseOrLoanRepayment =
                transaction.type === "expense" ||
                transaction.type === "loan_repayment";

              return (
                <li
                  key={transaction._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex-1 text-left">
                    <p className="font-semibold">
                      {transaction.type} - {transaction.category}
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    <p
                      className={`font-bold ${
                        isIncomeOrLoan ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIncomeOrLoan ? "+" : "-"}${transaction.amount}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
