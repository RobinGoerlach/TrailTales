// Import the Mongoose library for defining and interacting with MongoDB schemas
import mongoose from "mongoose";

// Define the schema for the 'Post' collection in MongoDB
const postSchema = new mongoose.Schema({
  // Title of the post, which is a required string field
  title: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Title is required"], // Makes the field mandatory with a custom error message
  },

  // Reference to the author of the post, stored as a MongoDB ObjectId
  author: {
    type: mongoose.Schema.ObjectId, // Indicates that this field stores an ObjectId
    ref: "User", // References the 'User' collection to establish a relationship
  },

  // Main content of the post, which is a required string field
  content: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Content is required"], // Makes the field mandatory with a custom error message
  },

  // URL or path to an image associated with the post, which is a required string field
  image: {
    type: String, // Specifies that the field must contain a string
    required: [true, "Image link is required"], // Makes the field mandatory with a custom error message
  },

  // Date when the post was created, defaults to the current date and time
  date: {
    type: Date, // Specifies that the field must contain a date
    default: Date.now, // Automatically sets the field to the current date and time
  },
});

// Export the 'Post' model based on the defined schema for use in other parts of the application
export default mongoose.model("Post", postSchema);
