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
    expenseIdFromParams: "",
    name: "",
    amount: 0,
    dateDueOrPayed: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const editExpense = async () => {
    try {
      const { name, amount, dateDueOrPayed } = post;
      const postValues = { name, amount, dateDueOrPayed };
      const response = await axios.patch(
        `api/editUserExpense/${session?.user?.id}?expenseId=${expenseId}`,
        {
          data: {
            updatedExpense: postValues,
          },
        }
      );
      console.log("response:", response.data);
    } catch (error) {
      console.error(error);
      // toast.error("Error updating expense");
    }
  };


  const getExpenseDetails = async () => {
    try {
      console.log("user to find:", session?.user?.id);
      console.log("expense to find:", expenseId);

      // const { name, amount, dateDueOrPayed } = post;
      // const updatedExpense = { name, amount, dateDueOrPayed };
      const response = await axios.get(
        `/api/getUserExpense/${session?.user?.id}`,
        {
          params: {
            expenseId: expenseId,
            // updatedExpense: updatedExpense,
          },
        }
      );
      const data = response.data;

      setPost({
        expenseIdFromParams: expenseId,
        name: data.name,
        amount: data.amount,
        dateDueOrPayed: data.dateDueOrPayed,
      });
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  // const getExpenseDetails = async () => {
  //   try {
  //     console.log("user to find:", session?.user?.id);
  //     console.log("expense to find:", expenseId);
  //     const response = await axios.get(
  //       `/api/getUserExpense/${session?.user?.id}`,
  //       {
  //         params: {
  //           expenseId: expenseId,
  //         }
  //       }
  //     );
  //     const data = response.data;

  //     console.log("expense data:", data);
  //   } catch (error) {
  //     console.error("Error fetching expense details:", error);
  //   }
  // };

  useEffect(() => {
    if(!post.expenseIdFromParams){
      getExpenseDetails();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    console.log("post values:", post);
  }, [post]);

  return (
    <ExpenseCrudForm
      type="Edit"
      post={post}
      setPost={setPost}
      loading={isLoading}
      handleSubmit={editExpense}
    />
  );
};

export default EditExpense;
