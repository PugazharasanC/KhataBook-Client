// src/components/TransactionForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/transactionSlice"; // Add your addTransaction action
import axiosInstance from "../utils/axiosConfig"; // Axios instance to make the API call

const TransactionForm = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const categories = {
    income: ["salary", "freelance", "gift", "investment"],
    expense: ["groceries", "entertainment", "utilities", "rent"],
    loan: ["personal loan", "mortgage", "education loan", "car loan"],
    loan_repayment: ["personal loan", "mortgage", "education loan", "car loan"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (amount && type && category && date) {
        const transactionData = {
          amount,
          type,
          category,
          description,
          date,
        };

        dispatch(addTransaction(transactionData));
        // Optionally reset the form
        setAmount("");
        setDescription("");
        setDate("");
      } else {
        console.log(amount, type, category, description, date);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 p-4">
      {/* Amount */}
      <div className="flex-1">
        <label htmlFor="amount" className="block">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Type */}
      <div className="flex-1">
        <label htmlFor="type" className="block">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="loan">Loan</option>
          <option value="loan_repayment">Loan Repayment</option>
        </select>
      </div>

      {/* Category */}
      <div className="flex-1">
        <label htmlFor="category" className="block">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          {categories[type].map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="flex-1">
        <label htmlFor="description" className="block">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Date */}
      <div className="flex-1">
        <label htmlFor="date" className="block">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="w-full mt-4">
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
