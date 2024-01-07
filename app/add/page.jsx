"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateExpense = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState({
    name: "",
    amount: 0,
    dateDueOrPayed: "",
    // date: new Date().toISOString(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {console.log(post)}, [post]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.patch(`api/addexpense`, {
        userId: session?.user?.id,
        expense: { ...post },
      });
  
      console.log("response: ", response);
      if (response.status === 200) {
        setTimeout(() => router.push("/track"), 500);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

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
