import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    // #swagger.tags = ['Auth']
    try {
      const { email, senha } = req.body;

      const service = new AuthService();
      const resultado = await service.loginAluno({ email, senha });

      res.status(200).json({
        sucesso: true,
        mensagem: "Login efetuado com sucesso",
        dados: {
          token: resultado,
        },
      });
    } catch (error) {
      onError(error, res);
    }
  }

}
