"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const EditExpense = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("expenseid");

  const [post, setPost] = useState({
    name: "",
    amount: 0,
    dateDueOrPayed: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const editExpense = async () => {
    const response = await axios.put(
      `api/editUserExpense/${session?.user?.id}`,
      {
        expenseId: expenseId,
      }
    );
    const data = await response.json();
  };

  const getExpenseDetails = async () => {
    try {
      console.log("user to find:", session?.user?.id);
      console.log("expense to find:", expenseId);
      const response = await axios.get(
        `/api/getUserExpense/${session?.user?.id}`,
        {
          params: {
            expenseId: expenseId,
          }
        }
      );
      const data = response.data;

      console.log("expense data:", data);
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  useEffect(() => {
    getExpenseDetails();
  }, [session?.user?.id]);

  return (
    <ExpenseCrudForm
      type="Edit"
      post={post}
      setPost={setPost}
      loading={isLoading}
      handleSubmit={() => {}}
    />
  );
};

export default EditExpense;
