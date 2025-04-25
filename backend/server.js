import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/index.js";
import userRoutes from "./routes/userRoutes.js";
import canvasRoutes from "./routes/canvasRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectToDatabase();
app.post("/test",(req,res)=>{
  console.log("Listening post req");
  res.sendStatus(200);
})
app.use("/api/users", userRoutes);
app.use("/api/canvas",canvasRoutes);


app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
