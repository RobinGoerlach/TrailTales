// Import the Mongoose library for defining and interacting with MongoDB schemas
import mongoose from "mongoose";

// Define the schema for the 'User' collection in MongoDB
const userSchema = new mongoose.Schema({
  // First name of the user, which is a required string field
  firstname: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Firstname is required"], // Makes the field mandatory with a custom error message
  },

  // Last name of the user, which is a required string field
  lastname: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Lastname is required"], // Makes the field mandatory with a custom error message
  },

  // Unique username for the user, which is a required string field
  username: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Username is required"], // Makes the field mandatory with a custom error message
    unique: true, // Ensures the username is unique across the collection
  },

  // Email address of the user, which is a unique and required string field
  email: {
    type: String, // Specifies that the field must contain a string
    unique: true, // Ensures the email is unique across the collection
    required: [true, "eMail is required"], // Makes the field mandatory with a custom error message
  },

  // Password for the user, which is a required string field
  password: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Password is required"], // Makes the field mandatory with a custom error message
    select: false, // Excludes the password field from query results by default
  },

  // Date when the user was created, defaults to the current date and time
  date: {
    type: String, // Specifies that the field must contain a string
    default: Date.now, // Automatically sets the field to the current date and time
  },
});

// Export the 'User' model based on the defined schema for use in other parts of the application
export default mongoose.model("User", userSchema);
