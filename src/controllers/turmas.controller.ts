import { Request, Response } from "express";
import { AlunosService } from "../services/alunos.service";
import { onError } from "../utils/on-error";
import { TurmasService } from "../services/turmas.service";

export class TurmasController {
  public static async listar(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Turmas']
    try {
      const { programa, edicao } = req.query;

      const service = new TurmasService();
      const resultado = await service.listar({
        programa: programa as string | undefined,
        edicao: edicao ? Number(edicao) : undefined,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Turmas listadas com sucesso",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public static async buscarPorID(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Turmas']
    try {
      const { id } = req.params;

      const service = new TurmasService();
      const resultado = await service.buscarPorId(id);

      res.status(200).json({
        sucesso: true,
        mensagem: "Turma encontrada",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public static async cadastrar(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Turmas']
    /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createTurma" }
    } */
    try {
      const { edicao, maxAlunos, programa } = req.body;

      const service = new TurmasService();
      const resultado = await service.cadastrar({
        edicao,
        maxAlunos,
        programa,
      });

      res.status(201).json({
        sucesso: true,
        mensagem: "Nova turma cadastrada",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public static async atualizar(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Turmas']
    try {
      const { id } = req.params;
      const { edicao, maxAlunos, programa } = req.body;

      const service = new TurmasService();
      const resultado = await service.atualizar({
        id,
        edicao,
        maxAlunos,
        programa,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Turma atualizada",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public static async deletar(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Turmas']
    try {
      const { id } = req.params;

      const service = new TurmasService();
      const resultado = await service.excluir(id);

      res.status(200).json({
        sucesso: true,
        mensagem: "Turma excluida",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
