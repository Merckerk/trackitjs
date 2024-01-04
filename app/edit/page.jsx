"use client";

import { useState } from "react";
import axios from "axios";
import ExpenseCrudForm from "@components/ExpenseCrud";
import toast from "react-hot-toast";

const EditExpense = () => {
  const [post, setPost] = useState({
    name: "",
    amount: 0,
    date: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [areFieldsValid, setAreFieldsValid] = useState(false);

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
