"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";

const CreateExpense = () => {
  const [post, setPost] = useState({
    name: "",
    amount: 0,
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

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
