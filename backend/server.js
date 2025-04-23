import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors()); 

app.get('/', (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
