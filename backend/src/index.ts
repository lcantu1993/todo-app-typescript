import express from "express";
import cors from "cors";
import { todosRouter } from "./routes/todos";
import { categoriesRouter } from "./routes/categories";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
