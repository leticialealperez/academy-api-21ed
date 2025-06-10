import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { Aluno, TipoAluno } from "@prisma/client";

export async function blockTechHelper(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { tipo } = req.alunoLogado;

    if (tipo === TipoAluno.T) {
      throw new HTTPError(401, "Recurso indisponível para aluno Tech Helper");
    }

    next();
  } catch (error) {
    onError(error, res);
  }
}
