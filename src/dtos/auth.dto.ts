import { TipoAluno } from "@prisma/client";

export interface LoginDto {
  email: string;
  senha: string;
}

export interface AlunoLogado {
  id: string;
  nome: string;
  email: string;
  tipo: TipoAluno;
}
