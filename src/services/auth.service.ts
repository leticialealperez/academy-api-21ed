import { prismaClient } from "../database/prisma.client";
import { AlunoLogado, LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/http.error";
import { JWT } from "../utils/jwt";
import { Bcrypt } from "../utils/bcrypt";

export class AuthService {
  public async loginAluno({ email, senha }: LoginDto): Promise<string> {
    const alunoEncontrado = await prismaClient.aluno.findUnique({
      where: { email },
    });

    if (!alunoEncontrado) {
      throw new HTTPError(401, "Credenciais inválidas")
    }

    const bcrypt = new Bcrypt();
    const isPasswordMatch = await bcrypt.comparar(senha, alunoEncontrado.senha);

    if (!isPasswordMatch) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const jwt = new JWT();
    const token = jwt.encoder<AlunoLogado>({
      id: alunoEncontrado.id,
      nome: alunoEncontrado.nome,
      email: alunoEncontrado.email,
      tipo: alunoEncontrado.tipo
    });

    return token; 
  }
}
