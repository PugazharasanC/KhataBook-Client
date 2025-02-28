import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/transactionSlice"; // Action for adding a transaction
import { toast } from "react-toastify"; // For toasts
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { fetchCategories } from "../store/categorySlice";
import CategoryInput from "./CategoryInput";

const TransactionForm = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("salary");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Amount validation (cannot be negative)
    if (Number(amount) < 0) {
      toast.error("Amount cannot be negative");
      return;
    }

    // Check if all fields are filled
    if (!amount || !type || !category || !date) {
      console.table({
        amount,
        type,
        category,
        description,
        date,
      });
      toast.error("Please fill in all fields");
      return;
    }

    // Ensure the date is not in the future
    if (new Date(date) > new Date()) {
      toast.error("Date cannot be in the future");
      return;
    }

    try {
      const transactionData = {
        amount: Number(amount), // Ensure amount is a number
        type,
        category: category.toLowerCase(),
        description,
        date,
      };

      // Dispatch action to add transaction (success/failure handled in slice)
      await dispatch(addTransaction(transactionData));

      // Reset form fields after successful submission
      setAmount("");
      setDescription("");
      setDate(new Date().toISOString().split("T")[0]);
      setCategory("salary"); // Reset the category after submission
      setType("income"); // Reset the type after submission

      // Show success toast
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      toast.error("Error submitting transaction");
    }
  };

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

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
          min="0"
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
          onChange={(e) => {
            setType(e.target.value);
            setCategory("");
          }} // Set type directly
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
      <CategoryInput
        categories={categories[type]} // Directly passing categories
        category={category} // Directly passing category
        setCategory={setCategory}
      />

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
          max={new Date().toISOString().split("T")[0]} // Restrict future dates
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
