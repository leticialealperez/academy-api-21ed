import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
  AtualizarAlunoDto,
  CadastrarAlunoDto,
  ListarAlunosDto,
} from "../dtos/alunos.dto";
import { HTTPError } from "../utils/http.error";
import { Bcrypt } from "../utils/bcrypt";

// Tipos Utilitários TS
type AlunoParcial = Omit<Aluno,"senha">;

export class AlunosService {
  public async cadastrar({
    email,
    nome,
    senha,
    idade,
    tipo
  }: CadastrarAlunoDto): Promise<AlunoParcial> {
    const emailJaCadastrado = await prismaClient.aluno.findUnique({
      where: { email: email },
    });

    if (emailJaCadastrado) {
      throw new HTTPError(409, "E-mail já cadastrado por outro aluno");
    }

    const bcrypt = new Bcrypt()
    const senhaEncriptografada = await bcrypt.gerarHash(senha);


    const novoAluno = await prismaClient.aluno.create({
      data: {
        nome,
        email,
        senha: senhaEncriptografada,
        idade
      },
      omit: {
        senha: true,
      },
    });


    const funcionalidades = await prismaClient.funcionalidade.findMany();

    for(const funcionalidade of funcionalidades) {

      /**
       * Para a funcionalidade de projetos é necessário que o tipo do aluno siga as instruções:
       * 
       */
      if (funcionalidade.nome === 'projetos') {
          // Projetos
          // Cadastrar - M e T
          // Atualizar - T
          // Excluir   - T
          // Listar    - T, F ou M
        await prismaClient.permissao.create({
          data: {
            alunoId: novoAluno.id,
            funcionalidadeId: funcionalidade.id,
            atualizar: tipo === 'T',
            criar: tipo === 'T' || tipo === 'M' ,
            deletar: tipo === 'T',
            ler: true
          }
        })

        continue
      }

      if (funcionalidade.nome === 'turmas') {
        // Turmas
        // Cadastrar, atualizar, excluir - T
        // Listar - todos
        await prismaClient.permissao.create({
          data: {
            alunoId: novoAluno.id,
            funcionalidadeId: funcionalidade.id,
            atualizar: tipo === 'T',
            criar: tipo === 'T',
            deletar: tipo === 'T',
            ler: true
          }
        })

        continue
      }

      if (funcionalidade.nome === 'matriculas') {
        // Matricula
        // Cadastrar - F ou M
        // Atualizar - T
        // Deletar   - T
        // Listagem  - todos
        await prismaClient.permissao.create({
          data: {
            alunoId: novoAluno.id,
            funcionalidadeId: funcionalidade.id,
            atualizar: tipo === 'T',
            criar: tipo === 'F' || tipo === 'M',
            deletar: tipo === 'T',
            ler: true
          }
        })

        continue
      }

      await prismaClient.permissao.create({
        data: {
          alunoId: novoAluno.id,
          funcionalidadeId: funcionalidade.id,
          atualizar: false,
          criar: false,
          deletar: false,
          ler: false
        }
      })
    }

    return novoAluno;
  }

  public async listar({ nome }: ListarAlunosDto): Promise<AlunoParcial[]> {
    const alunosDB = await prismaClient.aluno.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive",
        },
      },
      orderBy: {
        nome: "asc",
      },
      omit: { senha: true },
      include: {
        endereco: true,
      },
    });

    return alunosDB;
  }

  public async buscarPorId(idAluno: string): Promise<AlunoParcial> {
    const aluno = await prismaClient.aluno.findUnique({
      where: { id: idAluno },
      omit: {
        senha: true,
      },
      include: {
        endereco: true,
      },
    });

    if (!aluno) {
      throw new HTTPError(404, "Aluno não encontrado");
    }

    return aluno;
  }

  public async atualizar({
    id,
    email,
    idade,
    nome,
    senha,
  }: AtualizarAlunoDto): Promise<AlunoParcial> {
    await this.buscarPorId(id);

    const alunoAtualizado = await prismaClient.aluno.update({
      where: { id },
      data: {
        email,
        idade,
        nome,
        senha,
      },
      omit: {
        senha: true,
      },
    });

    return alunoAtualizado;
  }

  public async excluir(idAluno: string): Promise<AlunoParcial> {
    await this.buscarPorId(idAluno);

    const alunoExcluido = await prismaClient.aluno.delete({
      where: { id: idAluno },
      omit: {
        senha: true,
      },
    });

    return alunoExcluido;
  }
}
