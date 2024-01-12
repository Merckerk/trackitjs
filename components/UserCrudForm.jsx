"use client";

import React, { useState } from "react";

const UserCrudForm = ({
  type,
  payload,
  setPayload,
  loading,
  handleSubmit,
  handleDelete = () => {},
}) => {
  const [errMsg, setErrMsg] = useState({
    username: "",
    password: "",
    repassword: "",
  });

  const validateUsername = (value) => {
    const isValid = !!value;
    setErrMsg((prevErrMsg) => ({
      ...prevErrMsg,
      username: isValid ? "" : "Username is required",
    }));
    return isValid;
  };

  const validateEmail = (value) => {
    const isValid = /\S+@\S+\.\S+/.test(value); // Basic email format validation
    setErrMsg((prevErrMsg) => ({
      ...prevErrMsg,
      email: isValid ? "" : "Please enter a valid email address",
    }));
    return isValid;
  };
  

  const validatePassword = (value) => {
    const isLengthValid = value.length >= 12;
    const isCriteriaValid =
      /[a-z]/.test(value) && /[A-Z]/.test(value) && /\d/.test(value);
    const isValid = isLengthValid && isCriteriaValid;
    setErrMsg((prevErrMsg) => ({
      ...prevErrMsg,
      password: isLengthValid && isCriteriaValid ? "" : "Invalid password",
    }));
    return isValid;
  };

  const validateRepassword = (value) => {
    const isValid = !value || value === payload.password;
    setErrMsg((prevErrMsg) => ({
      ...prevErrMsg,
      repassword: isValid ? "" : "Passwords do not match",
    }));
    return isValid;
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-3xl font-satoshi font-semibold text-gray-900">
          {type} User
        </h1>

        <div className="form-group">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Username
            </span>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="form_input"
              onChange={(e) => {
                setPayload({ ...payload, username: e.target.value });
                validateUsername(e.target.value);
              }}
              value={payload?.username}
              required
            />
            {errMsg.username ? (
              <p className="error_message">{errMsg.username}</p>
            ) : null}
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Email
            </span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              className="form_input"
              onChange={(e) => {
                setPayload({ ...payload, email: e.target.value });
                validateEmail(e.target.value);
              }}
              value={payload?.email}
              required
            />
            {errMsg.username ? (
              <p className="error_message">{errMsg.username}</p>
            ) : null}
          </label>
        </div>

        <div className="form-group">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Password
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="form_input"
              onChange={(e) => {
                setPayload({ ...payload, password: e.target.value });
                validatePassword(e.target.value);
              }}
              value={payload?.password}
              required
            />
            {errMsg.password ? (
              <p className="error_message">{errMsg.password}</p>
            ) : null}
          </label>
        </div>

        <div className="form-group">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Retype Password
            </span>
            <input
              type="password"
              id="repassword"
              name="repassword"
              placeholder="Retype password"
              className="form_input"
              onChange={(e) => {
                setPayload({ ...payload, repassword: e.target.value });
                validateRepassword(e.target.value);
              }}
              value={payload?.repassword}
              required
            />
            {errMsg.repassword ? (
              <p className="error_message">{errMsg.repassword}</p>
            ) : null}
          </label>
        </div>

        <button className="black_btn" disabled={loading} type="submit">
          {loading ? "Processing" : `${type} User`}
        </button>
        {type === "Edit" ? (
          <button
            className="red_btn"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Processing" : "Delete User"}
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default UserCrudForm;
