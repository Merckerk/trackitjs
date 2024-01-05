import mongoose, { Schema, model, models } from "mongoose";

const expenseSchema = new Schema({
  name: String,
  amount: Number,
  dateDueOrPayed: String,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Must be unique"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  expenses: [expenseSchema],
});

const User = models.users || model("users", userSchema);

export default User;
