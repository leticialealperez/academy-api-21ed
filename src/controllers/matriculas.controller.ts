import { Request, Response } from "express";
import { onError } from "../utils/on-error";

export class MatriculasController {
  public async matricular(req: Request, res: Response) {
    try {
      //...
    } catch (error) {
      onError(error, res);
    }
  }

  public async listarAlunos(req: Request, res: Response) {
    try {
      //...
    } catch (error) {
      onError(error, res);
    }
  }

  public async listarTurmas(req: Request, res: Response) {
    try {
      //...
    } catch (error) {
      onError(error, res);
    }
  }
}
