import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "eMail is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
