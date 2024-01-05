"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CreateExpense = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [post, setPost] = useState({
    name: "",
    amount: 0,
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {console.log(post)}, [post]);
  useEffect(() => {console.log("seshid:",userId)}, [userId]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(`api/addexpense`, {
        userId: userId,
        expense: post,
      })

      console.log("response: ", response.data);
    } catch (error) {
      console.error("Error saving changes:", error)
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <ExpenseCrudForm
      type="Create"
      post={post}
      setPost={setPost}
      loading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateExpense;
