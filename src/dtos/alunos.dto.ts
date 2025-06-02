// DTO -> Data Transfer Object -> objeto de transferencia de dados estruturados

import { TipoAluno } from "@prisma/client";

export interface CadastrarAlunoDto {
  nome: string;
  idade?: number;
  email: string;
  senha: string;
  tipo: TipoAluno;
}

export interface ListarAlunosDto {
  nome?: string;
}

export type AtualizarAlunoDto = Partial<CadastrarAlunoDto> & { id: string };
