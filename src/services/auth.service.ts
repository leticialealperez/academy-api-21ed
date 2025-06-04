import { prismaClient } from "../database/prisma.client";
import { AlunoLogado, LoginDto } from "../dtos/auth.dto";
import { HTTPError } from "../utils/http.error";
import { JWT } from "../utils/jwt";
import { Bcrypt } from "../utils/bcrypt";

export class AuthService {
  public async loginAluno({ email, senha }: LoginDto): Promise<string> {
    const alunoEncontrado = await prismaClient.aluno.findUnique({
      where: { email },
      include: {
        permissoes: {
          omit: {
            alunoId: true,
            funcionalidadeId: true
          },
          include: {
            funcionalidade: true
          }
        }
      }
    });

    if (!alunoEncontrado) {
      throw new HTTPError(401, "Credenciais inválidas")
    }

    const bcrypt = new Bcrypt();
    const isPasswordMatch = await bcrypt.comparar(senha, alunoEncontrado.senha);

    if (!isPasswordMatch) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const permissoes = alunoEncontrado.permissoes.map((p) => ({
      funcionalidade: p.funcionalidade.nome,
      criar: p.criar,
      atualizar: p.atualizar,
      deletar: p.deletar,
      ler: p.ler
    }))

    const jwt = new JWT();
    const token = jwt.encoder<AlunoLogado>({
      id: alunoEncontrado.id,
      nome: alunoEncontrado.nome,
      email: alunoEncontrado.email,
      permissoes: permissoes
    });

    return token; 
  }
}
