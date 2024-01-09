"use client";

import { useState, useEffect } from "react";
import ExpenseList from "@components/Expenses";
import { mockExpenses } from "@mocks/expenses";
import ReusableInput from "@components/ReusableInput";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import axios from "axios";

const Track = () => {
  const { data: session } = useSession();
  const [allExpenses, setAllExpenses] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [expensesToLoad, setExpensesToLoad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log("sesh for track: ", session);
    loadUserExpenses();
  }, [session?.user])

  const loadUserExpenses = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/${session?.user?.id}`);
      const data = await res.json();

      console.log(data);
      setExpensesToLoad(data);
    } catch (error) {
      
    }finally{
      setIsLoading(false);
    }
  }

  const handleDelete = async (expenseId) => {
    console.log("expenseid from handle delete",expenseId)
    try {
      setIsLoading(true);

      const response = await axios.patch(`api/deleteUserExpense/${session?.user?.id}`, {
        expenseId: expenseId,
      })
      
      console.log("response: ", response.data);
      loadUserExpenses();
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  const handleEdit = (expenseId) => {
    router.push(`/edit-expense?expenseid=${expenseId}`)
  }

  return (
    <div className="container mx-auto mt-5 mb-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-7 glassmorphism">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-satoshi font-semibold text-gray-900">
            {session?.user?.username}'s Expenses
          </h1>
          <div className="flex gap-3">
            <button
              color="primary"
              onClick={() => {
                router.push("/add");
              }}
              className="black_btn"
            >
              Add Expense
            </button>
            <button
              color="primary"
              onClick={() => {
                signOut();
              }}
              className="black_btn"
            >
              Logout
            </button>
          </div>
        </div>
        <ExpenseList expenses={expensesToLoad} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Track;
