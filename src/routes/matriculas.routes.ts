import { Router } from "express";
import { MatriculasController } from "../controllers/matriculas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class MatriculasRoutes {
  public static bind(): Router {
    const router = Router();

    // matricular
    router.post("/matriculas", [authMiddleware], MatriculasController.matricular);

    // listar todos os alunos matriculados em uma turma
    router.get(
      "/matriculas/:id",
      [authMiddleware, validateUidFormatMiddleware],
      MatriculasController.listarAlunos
    );

    // listar todas as turmas em que o aluno logado esta matriculado
    router.get("/matriculas", [authMiddleware], MatriculasController.listarTurmas);

    return router;
  }
}
