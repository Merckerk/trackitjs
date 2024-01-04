"use client";

import { useState, useEffect } from "react";
import ExpenseList from "@components/Expenses";
import { mockExpenses } from "@mocks/expenses";
import ReusableInput from "@components/ReusableInput";

const Track = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [expensesToLoad, setExpensesToLoad] = useState([]);

  useEffect(() => {
    // Use mock data for initial setup
    setExpensesToLoad(mockExpenses);
  }, []);

  return (
    <div className="container mx-auto mt-5 mb-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-7 glassmorphism">
        <h1 className="text-3xl font-satoshi font-semibold text-gray-900">
          My Expenses
        </h1>
        <ExpenseList expenses={expensesToLoad} onDelete={() => {}} />
      </div>
    </div>
  );
};

export default Track;
