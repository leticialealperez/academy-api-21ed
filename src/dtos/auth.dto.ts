import { TipoAluno } from "@prisma/client";
import { Permissao } from "./alunos.dto";

export interface LoginDto {
  email: string;
  senha: string;
}

export interface AlunoLogado {
  id: string;
  nome: string;
  email: string;
  permissoes: Permissao[]
}
