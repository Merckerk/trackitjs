"use client";

import ReusableInput from "./ReusableInput";

const ExpenseCrudForm = ({
  type,
  post,
  setPost = () => {},
  loading,
  handleSubmit,
  handleDelete = () => {},
}) => {
  return (
    <div className="container mx-auto mt-5 mb-8">
      <form className="max-w-2xl mx-auto flex flex-col gap-7 glassmorphism">
        <h1 className="text-3xl font-satoshi font-semibold text-gray-900">
          {type} Expense
        </h1>

        <ReusableInput
          label="Name"
          type="text"
          id="name"
          name="name"
          placeholder="Enter Expense Name"
          className="form_input"
          onChange={(e) => {
            setPost({ ...post, name: e.target.value });
          }}
          value={post?.name}
          required
        />

        <ReusableInput
          label="Amount"
          type="number"
          id="amount"
          name="amount"
          placeholder="Enter expense amount"
          className="form_input"
          onChange={(e) => {
            setPost({ ...post, amount: e.target.value });
          }}
          value={post?.amount}
          required
        />

        <ReusableInput
          label="Date Due"
          type="date"
          id="dateDueOrPaid"
          name="dateDueOrPaid"
          placeholder="Enter Date"
          className="form_input"
          onChange={(e) => {
            setPost({ ...post, dateDueOrPayed: e.target.value });
          }}
          value={post?.date}
          errorMessage=""
          
        />

        <div className="form-group">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700 mr-7">
              Paid
            </span>
            <input
              type="checkbox"
              id="isPaid"
              name="isPaid"
              className="form_checkbox"
              onChange={(e) => {
                setPost({ ...post, isPaid: e.target.checked });
              }}
              checked={post?.isPaid}
            />
          </label>
        </div>

        <button className="black_btn" disabled={loading} onClick={handleSubmit}>
          {loading ? "Processing" : `${type} Expense`}
        </button>
        {/* {type === "Edit" ? (
          <button className="red_btn" disabled={loading} onClick={handleDelete}>
            {loading ? "Processing" : "Delete Expense"}
          </button>
        ) : null} */}
      </form>
    </div>
  );
};

export default ExpenseCrudForm;
