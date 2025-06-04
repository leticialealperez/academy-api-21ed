import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { JWT } from "../utils/jwt";
import { AlunoLogado } from "../dtos/auth.dto";
import { possuiPermissao } from "../utils/possui-permissao";
import { prismaClient } from "../database/prisma.client";
import { Permissao } from "../dtos/alunos.dto";

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

    const permissoesDoAluno = await prismaClient.permissao.findMany({
      where: { alunoId: alunoLogado.id },
      include: {
        funcionalidade: true
      }
    });

    const permissoesMap: Permissao[] = permissoesDoAluno.map((p) => ({
      funcionalidade: p.funcionalidade.nome,
      ler: p.ler,
      atualizar: p.atualizar,
      criar: p.criar,
      deletar: p.deletar
    }))

    const estaAutorizado = possuiPermissao({
      verboHttp: req.method,
      rota: req.path,
      permissoesAluno: permissoesMap
    });

    if (!estaAutorizado) {
      throw new HTTPError(403, "Recurso não autorizado para este usuário");
    }

    // adicionar novos dados na requisição
    req.alunoLogado = alunoLogado;

    next();
  } catch (error) {
    onError(error, res);
  }
}
