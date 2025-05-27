import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { JWT } from "../utils/jwt";
import { AlunoLogado } from "../dtos/auth.dto";

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

    const [, token] = bearerToken.split(" "); // "Bearer abcndhfvdhj"

    const jwt = new JWT();
    const alunoLogado = jwt.decoder<AlunoLogado>(token);

    // adicionar novos dados na requisição
    req.alunoLogado = alunoLogado;

    next();
  } catch (error) {
    onError(error, res);
  }
}
