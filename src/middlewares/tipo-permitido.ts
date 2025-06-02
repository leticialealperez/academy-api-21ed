import { TipoAluno } from "@prisma/client";
import { onError } from "../utils/on-error";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../utils/http.error";
import { prismaClient } from "../database/prisma.client";

export async function tipoPermitido(
    req: Request,
    res: Response,
    next: NextFunction,
    tiposPermitidos: TipoAluno[]
) {
    try {
        const { tipo, id } = req.alunoLogado;

        const isIncluded = tiposPermitidos.includes(tipo);

        if (!isIncluded) {
            throw new HTTPError(403, 'Você não possui permissão para acessar o recurso')
        }

        const aluno = await prismaClient.aluno.findUnique({
            where: { id }
        });

        if(!aluno) throw new HTTPError(404, "Não foi possível encontrar seu cadastro no sistema");


        if (!tiposPermitidos.includes(aluno.tipo)) {
            throw new HTTPError(403, 'Você não possui mais permissão para acessar esse recurso.')
        }

        next();
    } catch (error) {
        onError(error, res);
    }
}