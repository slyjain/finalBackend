import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/index.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectToDatabase();

app.use("/api/users", userRoutes);


app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
