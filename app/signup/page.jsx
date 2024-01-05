"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserCrudForm from "@components/UserCrudForm";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  const [payload, setPayload] = useState({
    username: "",
    password: "",
    repassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const onCreateUser = async () => {
    try {
      setIsLoading(true);
      const { username, password, repassword } = payload;

      if (password !== repassword) {
        toast.error("Passwords do not match. Please try again.");
        return new Response(
          "Passwords do not match. Please re-enter the password."
        );
      }

      const payloadValues = { username, password };
      const response = await axios.post("api/signup", payloadValues);
      toast.success("Successfully created a user.");
      router.push("/login");
    } catch (error) {
      toast.error("Internal server error.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!payload.username || !payload.password || !payload.repassword) {
      setAreFieldsValid(true);
    } else {
      setAreFieldsValid(false);
    }
  }, [payload]);

  useEffect(() => {
    console.log(payload);
  }, [payload]);

  return (
    <UserCrudForm
      type="Create"
      payload={payload}
      setPayload={setPayload}
      loading={isLoading}
      handleSubmit={onCreateUser}
    />
  );
};

export default SignUp;
