"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CreateExpense = () => {
  const { data: session } = useSession();
  const userId = session?.user?.username;
  const [post, setPost] = useState({
    name: "",
    amount: 0,
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {console.log(post)}, [post]);
  useEffect(() => {console.log(session)}, [userId]);

  return (
    <ExpenseCrudForm
      type="Create"
      post={post}
      setPost={setPost}
      loading={isLoading}
      handleSubmit={() => {}}
    />
  );
};

export default CreateExpense;
