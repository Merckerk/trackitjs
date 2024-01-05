import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  //will be stored in an admin table
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

const User = models.users || model("users", userSchema);

export default User;
