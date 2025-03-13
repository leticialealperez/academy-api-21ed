import express from "express";
import { envs } from "./envs";
import { AlunosRoutes } from "./routes/alunos.routes";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use(AlunosRoutes.bind());

app.listen(envs.PORT, () => console.log("Server is running"));
