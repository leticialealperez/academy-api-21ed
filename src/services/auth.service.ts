import { prismaClient } from "../database/prisma.client";
import { AlunoLogado, LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/http.error";
import { v4 as randomUUID } from "uuid";
import { JWT } from "../utils/jwt";

export class AuthService {
  public async loginAluno({ email, senha }: LoginDto): Promise<string> {
    const alunoEncontrado = await prismaClient.aluno.findUnique({
      where: { email, senha },
    });

    if (!alunoEncontrado) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const jwt = new JWT();
    const token = jwt.encoder<AlunoLogado>({
      id: alunoEncontrado.id,
      nome: alunoEncontrado.nome,
      email: alunoEncontrado.email
    });

    return token; 
  }

  public async logoutAluno(alunoId: string): Promise<void> {
    await prismaClient.aluno.update({
      where: { id: alunoId },
      data: { authToken: null },
    });
  }
}
