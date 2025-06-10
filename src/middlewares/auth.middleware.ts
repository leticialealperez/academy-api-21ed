import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { JWT } from "../utils/jwt";
import { AlunoLogado } from "../dtos/auth.dto";
import prismaClient  from "../database/prisma.client";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new HTTPError(401, "Token de autenticação ausente");
    }

    const [, token] = bearerToken.split(" ");

    const jwt = new JWT();
    const alunoLogado = jwt.decoder<AlunoLogado>(token);

    const aluno = await prismaClient.aluno.findUnique({
      where: { id: alunoLogado.id }
    });

    if (!aluno) {
      throw new HTTPError(401, "Token inválido");
    }

    // adicionar novos dados na requisição
    req.alunoLogado = alunoLogado;

    next();
  } catch (error) {
    onError(error, res);
  }
}
