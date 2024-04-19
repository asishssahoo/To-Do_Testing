import express from "express";
import dotenv  from 'dotenv';
dotenv.config();
// Import the PostsRoutes from the post.routes file
import routes from "./routes/routes";



// Create an instance of the Express
export const app = express();

// Define the port to listen on
const PORT = process.env.PORT || 3001;
console.log("PORT in env file is: " + process.env.PORT);

app.use(express.json());

// Use the PostsRoutes for any routes starting with /posts
//app.use("/",routes);
app.use('/', routes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});