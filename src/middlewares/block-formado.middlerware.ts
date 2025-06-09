import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";
import { Aluno, TipoAluno } from "@prisma/client";

export async function blockFormado(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { tipo } = req.alunoLogado;


    if (tipo === TipoAluno.F) {
      throw new HTTPError(401, "Recurso indisponível para aluno Formado");
    }

    next();
  } catch (error) {
    onError(error, res);
  }
}
