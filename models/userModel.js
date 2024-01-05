import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  //will be stored in an admin table
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
  // expenses: [expenseSchema],
});

const User = models.users || model("users", userSchema);

export default User;
