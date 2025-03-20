import { Router } from "express";
import { MatriculasController } from "../controllers/matriculas.controller";

export class MatriculasRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new MatriculasController();

    // matricular
    router.post("/matriculas", controller.matricular);

    // listar todos os alunos matriculados em uma turma
    router.get("/matriculas/turmas/:idTurma", controller.listarAlunos);

    // listar todas as turmas em que um aluno esta matriculado
    router.get("/matriculas/alunos/:idAluno", controller.listarTurmas);

    return router;
  }
}
